import { defineConfig, devices } from '@playwright/test';

/**
 * Avaliacao de funcionamento dos chatbots do gwan-ia (Jaiminho/Gwan Saude, Mart,
 * Imoveis, Events) — grava um video por bot com veredito visivel (aprovado/bloqueado)
 * e escreve e2e-chatbots/out/report.json com o resultado estruturado.
 *
 * Isto NAO e o video institucional/marketing (esse fica em e2e-demo/, quando existir
 * neste repo) — e QA: prova, com evidencia em video, se cada bot responde de verdade.
 *
 * Roda contra localhost por padrao (nunca produção sem decisão explícita — ver
 * docs/video-institucional-padrao.md no gwan-infra para a mesma regra aplicada
 * ao video de marketing). Ajuste CHATBOTS_BASE_URL se a porta local mudar.
 */

const OUT = process.env.CHATBOTS_OUT ?? 'e2e-chatbots/out';

export default defineConfig({
  testDir: './e2e-chatbots/scenes',
  testMatch: /.*\.eval\.ts$/,

  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 60_000,

  outputDir: `${OUT}/raw`,
  reporter: [['list']],
  globalSetup: './e2e-chatbots/fixtures/global-setup.ts',

  use: {
    baseURL: process.env.CHATBOTS_BASE_URL ?? 'http://localhost:5173',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    colorScheme: 'light',
    trace: 'off',
    screenshot: 'off',

    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    video: { mode: 'on', size: { width: 1920, height: 1080 } },

    launchOptions: {
      slowMo: Number(process.env.CHATBOTS_SLOWMO ?? 80),
      args: ['--hide-scrollbars', '--force-color-profile=srgb'],
    },
  },

  projects: [
    {
      name: 'chatbots-eval',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
      },
    },
  ],
});
