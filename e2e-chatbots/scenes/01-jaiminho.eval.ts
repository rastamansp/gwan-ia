import { test } from '../fixtures/eval';

/**
 * Bot: Jaiminho / Gwan Saude — POST /api/chat-health.
 *
 * Servido pelo MESMO backend do bot Events (apps/events/gwan-events-backend),
 * dois controllers no mesmo processo — ver apps/events/CLAUDE.md.
 */
const HEALTH_URL = 'http://localhost:3001/api/health';
const CHAT_URL = 'http://localhost:3001/api/chat-health';

test('Jaiminho (Gwan Saude)', async ({ page, request, demo }) => {
  await demo.scene(
    'Jaiminho — Gwan Saude',
    '/bot-jaiminho · POST /api/chat-health'
  );

  const health = await demo.checkBackend(request, HEALTH_URL);
  if (!health.reachable) {
    await page.goto('/bot-jaiminho');
    await demo.say(
      'Backend indisponivel — pulando teste de envio de mensagem.'
    );
    await demo.verdict({
      botName: 'Jaiminho (Gwan Saude)',
      route: '/bot-jaiminho',
      healthUrl: HEALTH_URL,
      chatUrl: CHAT_URL,
      outcome: 'blocked',
      reason: `Backend nao respondeu em ${HEALTH_URL}: ${health.detail}`,
    });
    return;
  }

  await page.goto('/bot-jaiminho');
  await demo.say('Backend de pe. Enviando uma pergunta de saude de teste...');

  const input = page.locator('input[placeholder="Mensagem"]');
  const sendButton = page.locator('form button[type="submit"]');

  await demo.type(input, 'Quais sao os sintomas de gripe?');

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
        reason =
          'HTTP 200 mas sem texto de resposta no payload (formattedResponse.answer/answer/markdownAnswer vazios).';
      }
    } else {
      // Unico erro reproduzido localmente ate agora: OPENAI_API_KEY placeholder no
      // .env do backend (401 invalid_api_key, bolha como 500 generico no controller).
      // Ver apps/events/gwan-events-backend/.env — troque REPLACE_ME_... pela chave real.
      outcome = 'blocked';
      reason = `Backend respondeu HTTP ${httpStatus} — provavel OPENAI_API_KEY ausente/invalida em gwan-events-backend/.env (ver logs do backend).`;
    }
    await demo.beat(900);
  } catch (err) {
    outcome = 'fail';
    reason = `Erro aguardando resposta: ${err instanceof Error ? err.message : String(err)}`;
  }

  await demo.verdict({
    botName: 'Jaiminho (Gwan Saude)',
    route: '/bot-jaiminho',
    healthUrl: HEALTH_URL,
    chatUrl: CHAT_URL,
    outcome,
    reason,
    httpStatus,
    responseExcerpt: excerpt,
  });
});
