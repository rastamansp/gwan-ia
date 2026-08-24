import { test } from '../fixtures/eval';

/**
 * Bot: Gwan Mart — POST /api/chat.
 *
 * Bloqueado por infraestrutura, nao por config: apps/mart-backend nesta maquina
 * so tem README.md ("aguardando extracao do Portainer"). O repo gwan-mart-backend
 * EXISTE no GitHub (confirmado via `git ls-remote`), mas nunca foi clonado/onboardado
 * aqui — falta docker-compose.yml/make.ps1 proprios, e nenhum Postgres/porta local
 * foi provisionado para ele. VITE_GWAN_MART_CHAT_URL aponta para localhost:3099 de
 * proposito (porta sem nada escutando) para o health-check falhar rapido em vez de
 * essa cena travar tentando alcancar algo que nao existe.
 */
const HEALTH_URL = 'http://localhost:3099/api/health';
const CHAT_URL = 'http://localhost:3099/api/chat';

test('Gwan Mart', async ({ page, request, demo }) => {
  await demo.scene('Gwan Mart', '/bot-gwan-mart · POST /api/chat');

  const health = await demo.checkBackend(request, HEALTH_URL);

  await page.goto('/bot-gwan-mart');
  await demo.say(
    'apps/mart-backend nao foi onboardado nesta maquina (so tem README).'
  );
  await demo.beat(800);

  await demo.verdict({
    botName: 'Gwan Mart',
    route: '/bot-gwan-mart',
    healthUrl: HEALTH_URL,
    chatUrl: CHAT_URL,
    outcome: 'blocked',
    reason: health.reachable
      ? `Inesperado: algo respondeu em ${HEALTH_URL} (${health.detail}) — reavaliar este bloqueio.`
      : 'Backend gwan-mart-backend nunca foi clonado/onboardado em apps/mart-backend (so ha README). Repo existe no GitHub mas falta docker-compose/make.ps1/env locais.',
  });
});
