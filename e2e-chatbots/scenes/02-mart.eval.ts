import { test } from '../fixtures/eval';

/**
 * Bot: Gwan Mart — POST /api/chat (apps/mart-backend/gwan-mart-backend, porta 3011).
 *
 * Historico: esta cena reportava "bloqueado" fixo porque apps/mart-backend so tinha
 * um README ("aguardando extracao do Portainer"). O repo foi clonado, ganhou infra
 * de dev propria (Postgres 5436 + MinIO 9010, apps/mart-backend/docker-compose.dev.yml)
 * e o provider Claude foi portado do gwan-imoveis-backend — o fork era OpenAI-only.
 *
 * Porta 3011 = slot 11 do padrao de portas. O .env.example do repo diz 3009, que e a
 * porta do imoveis: este repo e fork dele e herdou a porta (e o DATABASE_URL).
 */
const HEALTH_URL = 'http://localhost:3011/api/health';
const CHAT_URL = 'http://localhost:3011/api/chat';

test('Gwan Mart', async ({ page, request, demo }) => {
  await demo.scene('Gwan Mart', '/bot-gwan-mart · POST /api/chat');

  const health = await demo.checkBackend(request, HEALTH_URL);
  if (!health.reachable) {
    await page.goto('/bot-gwan-mart');
    await demo.say(
      'Backend indisponivel — pulando teste de envio de mensagem.'
    );
    await demo.verdict({
      botName: 'Gwan Mart',
      route: '/bot-gwan-mart',
      healthUrl: HEALTH_URL,
      chatUrl: CHAT_URL,
      outcome: 'blocked',
      reason: `Backend nao respondeu em ${HEALTH_URL}: ${health.detail}`,
    });
    return;
  }

  await page.goto('/bot-gwan-mart');
  await demo.say('Backend de pe. Perguntando sobre o catalogo de produtos...');

  const input = page.locator('input[placeholder="Mensagem"]');
  const sendButton = page.locator('form button[type="submit"]');

  await demo.type(input, 'Quais produtos voces tem disponiveis?');

  const responsePromise = page.waitForResponse(
    res => res.url() === CHAT_URL && res.request().method() === 'POST',
    { timeout: 30_000 }
  );
  await demo.click(sendButton);

  const start = Date.now();
  let outcome: 'pass' | 'fail' | 'blocked' = 'fail';
  let reason = 'Sem resposta do backend dentro do timeout.';
  let httpStatus: number | undefined;
  let excerpt: string | undefined;

  try {
    const res = await responsePromise;
    httpStatus = res.status();
    const latencyMs = Date.now() - start;
    const body = await res.json().catch(() => null);

    if (res.ok() && body) {
      const answer: string | undefined =
        body.formattedResponse?.answer || body.answer || body.markdownAnswer;
      if (answer && answer.trim().length > 0) {
        outcome = 'pass';
        reason = `Respondeu em ${latencyMs}ms.`;
        excerpt = answer.slice(0, 180);
      } else {
        outcome = 'fail';
        reason = 'HTTP 200 mas sem texto de resposta no payload.';
      }
    } else {
      outcome = 'blocked';
      reason = `Backend respondeu HTTP ${httpStatus} — verificar AI_PROVIDER/CLAUDE_API_KEY em gwan-mart-backend/.env (ver logs do backend).`;
    }
    await demo.beat(900);
  } catch (err) {
    outcome = 'fail';
    reason = `Erro aguardando resposta: ${err instanceof Error ? err.message : String(err)}`;
  }

  await demo.verdict({
    botName: 'Gwan Mart',
    route: '/bot-gwan-mart',
    healthUrl: HEALTH_URL,
    chatUrl: CHAT_URL,
    outcome,
    reason,
    httpStatus,
    responseExcerpt: excerpt,
  });
});
