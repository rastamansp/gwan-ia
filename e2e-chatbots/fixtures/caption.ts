/// <reference lib="dom" />
import type { Page } from '@playwright/test';

/**
 * Legendas, cartelas de título e spotlight — tudo no DOM, não em ffmpeg.
 *
 * Decisão do padrão: a legenda é desenhada DENTRO da página e gravada junto com
 * o vídeo. A alternativa (queimar texto depois, no ffmpeg) exige manter uma
 * tabela de timestamps em sincronia com o que o teste faz — e ela desincroniza
 * na primeira vez que um `await` demora 300ms a mais. No DOM, a legenda está na
 * tela exatamente enquanto a ação acontece, por construção.
 *
 * O ffmpeg fica com o que ele faz bem: normalizar, concatenar, trilha e encode.
 */

const OVERLAY_CSS = `
  #__demo_caption{position:fixed;left:50%;bottom:56px;transform:translateX(-50%) translateY(12px);
    max-width:min(1200px,82vw);z-index:2147483600;pointer-events:none;opacity:0;
    transition:opacity 320ms ease,transform 320ms ease;
    font:600 30px/1.35 ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    color:#f8fafc;text-align:center;padding:18px 30px;border-radius:16px;
    background:rgba(2,6,23,.82);backdrop-filter:blur(6px);
    box-shadow:0 18px 48px rgba(2,6,23,.45);border:1px solid rgba(148,163,184,.22)}
  #__demo_caption.on{opacity:1;transform:translateX(-50%) translateY(0)}

  #__demo_title{position:fixed;inset:0;z-index:2147483610;pointer-events:none;opacity:0;
    transition:opacity 420ms ease,background 420ms ease;display:flex;flex-direction:column;
    align-items:center;justify-content:center;gap:18px;background:rgba(2,6,23,.92);color:#f8fafc;
    font-family:ui-sans-serif,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;text-align:center}
  #__demo_title.on{opacity:1}
  #__demo_title .t{font-size:72px;font-weight:800;letter-spacing:-.02em;max-width:80vw}
  #__demo_title .s{font-size:30px;font-weight:500;color:#94a3b8;max-width:70vw}
  #__demo_title .badge{font-size:26px;font-weight:700;padding:8px 22px;border-radius:999px;
    letter-spacing:.02em}
  /* tons de veredito — QA, nao usado na cartela de abertura/encerramento */
  #__demo_title.tone-pass{background:rgba(6,30,20,.94)}
  #__demo_title.tone-pass .badge{background:rgba(34,197,94,.18);color:#4ade80;
    border:1px solid rgba(74,222,128,.5)}
  #__demo_title.tone-fail{background:rgba(35,10,10,.94)}
  #__demo_title.tone-fail .badge{background:rgba(239,68,68,.18);color:#f87171;
    border:1px solid rgba(248,113,113,.5)}

  #__demo_spot{position:fixed;z-index:2147483590;pointer-events:none;opacity:0;
    border-radius:14px;transition:opacity 300ms ease;
    box-shadow:0 0 0 9999px rgba(2,6,23,.62),0 0 0 3px rgba(56,189,248,.95)}
  #__demo_spot.on{opacity:1}
`;

/** Injeta os elementos de overlay. Reaplicado a cada documento (sobrevive a navegação). */
export async function installOverlay(page: Page): Promise<void> {
  await page.addInitScript(
    ({ css }) => {
      const mount = () => {
        const root = document.body || document.documentElement;
        if (!root || document.getElementById('__demo_caption')) return;

        const style = document.createElement('style');
        style.textContent = css;
        (document.head || root).appendChild(style);

        const caption = document.createElement('div');
        caption.id = '__demo_caption';

        const title = document.createElement('div');
        title.id = '__demo_title';
        title.innerHTML =
          '<div class="badge" style="display:none"></div><div class="t"></div><div class="s"></div>';

        const spot = document.createElement('div');
        spot.id = '__demo_spot';

        root.appendChild(spot);
        root.appendChild(caption);
        root.appendChild(title);
      };

      if (document.readyState === 'loading')
        addEventListener('DOMContentLoaded', mount);
      else mount();
    },
    { css: OVERLAY_CSS }
  );
}

export async function showCaption(page: Page, text: string): Promise<void> {
  await page.evaluate(t => {
    const el = document.getElementById('__demo_caption');
    if (!el) return;
    el.textContent = t;
    el.classList.add('on');
  }, text);
}

export async function hideCaption(page: Page): Promise<void> {
  await page.evaluate(() =>
    document.getElementById('__demo_caption')?.classList.remove('on')
  );
}

export async function showTitleCard(
  page: Page,
  title: string,
  subtitle = ''
): Promise<void> {
  await page.evaluate(
    ({ title, subtitle }) => {
      const el = document.getElementById('__demo_title');
      if (!el) return;
      (el.querySelector('.t') as HTMLElement).textContent = title;
      (el.querySelector('.s') as HTMLElement).textContent = subtitle;
      el.classList.add('on');
    },
    { title, subtitle }
  );
}

export async function hideTitleCard(page: Page): Promise<void> {
  await page.evaluate(() => {
    const el = document.getElementById('__demo_title');
    if (!el) return;
    el.classList.remove('on', 'tone-pass', 'tone-fail');
    const badge = el.querySelector('.badge') as HTMLElement | null;
    if (badge) badge.style.display = 'none';
  });
}

/** Cartela de veredito (QA): badge PASS/FAIL + título + detalhe, tom verde/vermelho. */
export async function showVerdictCard(
  page: Page,
  pass: boolean,
  title: string,
  detail: string
): Promise<void> {
  await page.evaluate(
    ({ pass, title, detail }) => {
      const el = document.getElementById('__demo_title');
      if (!el) return;
      el.classList.add(pass ? 'tone-pass' : 'tone-fail');
      const badge = el.querySelector('.badge') as HTMLElement | null;
      if (badge) {
        badge.textContent = pass ? '✓ FUNCIONANDO' : '✗ BLOQUEADO';
        badge.style.display = 'inline-block';
      }
      (el.querySelector('.t') as HTMLElement).textContent = title;
      (el.querySelector('.s') as HTMLElement).textContent = detail;
      el.classList.add('on');
    },
    { pass, title, detail }
  );
}

/** Escurece a página inteira menos o retângulo informado (coordenadas de viewport). */
export async function showSpotlight(
  page: Page,
  box: { x: number; y: number; width: number; height: number },
  pad = 10
): Promise<void> {
  await page.evaluate(
    ({ box, pad }) => {
      const el = document.getElementById('__demo_spot');
      if (!el) return;
      el.style.left = `${box.x - pad}px`;
      el.style.top = `${box.y - pad}px`;
      el.style.width = `${box.width + pad * 2}px`;
      el.style.height = `${box.height + pad * 2}px`;
      el.classList.add('on');
    },
    { box, pad }
  );
}

export async function hideSpotlight(page: Page): Promise<void> {
  await page.evaluate(() =>
    document.getElementById('__demo_spot')?.classList.remove('on')
  );
}
