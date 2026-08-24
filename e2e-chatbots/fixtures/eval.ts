import {
  test as base,
  expect,
  type APIRequestContext,
  type Locator,
  type Page,
} from '@playwright/test';
import { mkdir, appendFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { installCursor } from './cursor';
import {
  installOverlay,
  showCaption,
  hideCaption,
  showTitleCard,
  hideTitleCard,
  showVerdictCard,
  showSpotlight,
  hideSpotlight,
} from './caption';

export const OUT_DIR = process.env.CHATBOTS_OUT ?? 'e2e-chatbots/out';
const PACE = Number(process.env.CHATBOTS_PACE ?? 1);

export type BotResult = {
  order: number;
  slug: string;
  botName: string;
  route: string;
  healthUrl: string | null;
  chatUrl: string;
  video: string;
  outcome: 'pass' | 'fail' | 'blocked';
  reason: string;
  httpStatus?: number;
  latencyMs?: number;
  responseExcerpt?: string;
};

export type Eval = {
  page: Page;
  scene(title: string, subtitle?: string): Promise<void>;
  say(text: string, holdMs?: number): Promise<void>;
  beat(ms?: number): Promise<void>;
  moveTo(target: Locator): Promise<void>;
  click(target: Locator): Promise<void>;
  type(target: Locator, text: string): Promise<void>;
  spotlight(target: Locator, holdMs?: number): Promise<void>;

  /**
   * Health-check pre-voo: tenta um GET rapido contra `healthUrl` antes de qualquer
   * interacao. Backend fora do ar deve ser detectado aqui (poucos segundos), nao
   * pelo timeout longo de uma resposta de chat que nunca vai chegar.
   */
  checkBackend(
    request: APIRequestContext,
    healthUrl: string
  ): Promise<{ reachable: boolean; status?: number; detail: string }>;

  /** Mostra a cartela de veredito, grava no manifesto da cena e ENCERRA o teste com throw se pass=false. */
  verdict(input: {
    botName: string;
    route: string;
    healthUrl: string | null;
    chatUrl: string;
    outcome: 'pass' | 'fail' | 'blocked';
    reason: string;
    httpStatus?: number;
    latencyMs?: number;
    responseExcerpt?: string;
    holdMs?: number;
  }): Promise<void>;
};

export const test = base.extend<{ demo: Eval }>({
  demo: async ({ page }, use, testInfo) => {
    const file = path.basename(testInfo.file).replace(/\.eval\.ts$/, '');
    const match = /^(\d+)-(.+)$/.exec(file);
    const order = match ? Number(match[1]) : 999;
    const slug = match ? match[2] : file;
    const videoRel = `scenes/${file}.webm`;

    await installCursor(page);
    await installOverlay(page);
    await page.mouse.move(960, 1040);

    const wait = (ms: number) => page.waitForTimeout(Math.round(ms * PACE));

    const demo: Eval = {
      page,

      async scene(title, subtitle = '') {
        await showTitleCard(page, title, subtitle);
        await wait(1400);
        await hideTitleCard(page);
        await wait(400);
      },

      async say(text, holdMs) {
        await showCaption(page, text);
        const hold = holdMs ?? Math.min(6000, Math.max(1600, text.length * 55));
        await wait(hold);
      },

      async beat(ms = 700) {
        await wait(ms);
      },

      async moveTo(target) {
        await target.scrollIntoViewIfNeeded();
        const box = await target.boundingBox();
        if (!box) throw new Error('Elemento sem boundingBox (invisível?)');
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, {
          steps: 24,
        });
        await wait(200);
      },

      async click(target) {
        await demo.moveTo(target);
        await target.click();
        await wait(350);
      },

      async type(target, text) {
        await demo.click(target);
        await target.pressSequentially(text, { delay: Math.round(55 * PACE) });
        await wait(300);
      },

      async spotlight(target, holdMs = 1400) {
        await target.scrollIntoViewIfNeeded();
        const box = await target.boundingBox();
        if (!box) throw new Error('Elemento sem boundingBox (invisível?)');
        await showSpotlight(page, box);
        await wait(holdMs);
        await hideSpotlight(page);
        await wait(250);
      },

      async checkBackend(req, healthUrl) {
        const start = Date.now();
        try {
          const res = await req.get(healthUrl, { timeout: 4000 });
          return {
            reachable: true,
            status: res.status(),
            detail: `HTTP ${res.status()} em ${Date.now() - start}ms`,
          };
        } catch (err) {
          return {
            reachable: false,
            detail: err instanceof Error ? err.message : String(err),
          };
        }
      },

      async verdict(input) {
        const holdMs = input.holdMs ?? 3200;
        const pass = input.outcome === 'pass';
        const badgeTitle = `${input.botName} — ${pass ? 'Funcionando' : input.outcome === 'blocked' ? 'Bloqueado' : 'Falhou'}`;
        await hideCaption(page).catch(() => {});
        await showVerdictCard(page, pass, badgeTitle, input.reason);
        await wait(holdMs);

        const result: BotResult = {
          order,
          slug,
          botName: input.botName,
          route: input.route,
          healthUrl: input.healthUrl,
          chatUrl: input.chatUrl,
          video: videoRel,
          outcome: input.outcome,
          reason: input.reason,
          httpStatus: input.httpStatus,
          latencyMs: input.latencyMs,
          responseExcerpt: input.responseExcerpt,
        };

        const reportPath = path.join(OUT_DIR, 'report.ndjson');
        await mkdir(OUT_DIR, { recursive: true });
        await appendFile(reportPath, JSON.stringify(result) + '\n', 'utf8');

        const manifestPath = path.join(
          OUT_DIR,
          'manifest',
          `${String(order).padStart(3, '0')}-${slug}.json`
        );
        await mkdir(path.dirname(manifestPath), { recursive: true });
        await writeFile(manifestPath, JSON.stringify(result, null, 2), 'utf8');

        // A cena SEMPRE grava e reporta, mesmo quando o bot esta bloqueado —
        // "bloqueado" e um resultado valido de avaliacao, nao um erro do harness.
        // Só falha o teste (sinalizando vermelho no runner) quando outcome==='fail',
        // ou seja: o backend respondeu mas devolveu algo errado — isso sim é regressão.
        if (input.outcome === 'fail') {
          expect(input.outcome, `${input.botName}: ${input.reason}`).not.toBe(
            'fail'
          );
        }
      },
    };

    const video = page.video();

    await use(demo);

    await hideCaption(page).catch(() => {});
    await hideSpotlight(page).catch(() => {});
    await page.waitForTimeout(400).catch(() => {});

    await page.close();
    if (video) {
      const dest = path.join(OUT_DIR, videoRel);
      await mkdir(path.dirname(dest), { recursive: true });
      await video.saveAs(dest);
    }
  },
});

export { expect };
