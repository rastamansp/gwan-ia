import { mkdir, rm } from 'node:fs/promises';

const OUT = process.env.CHATBOTS_OUT ?? 'e2e-chatbots/out';

/**
 * report.ndjson e manifest/ sao gravados em append/overwrite por cena — sem isto,
 * uma segunda rodada mistura o veredito de hoje com o de ontem no mesmo arquivo.
 */
export default async function globalSetup() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
}
