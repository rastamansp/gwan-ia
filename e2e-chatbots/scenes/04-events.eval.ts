import { test } from '../fixtures/eval';

/**
 * Bot: Gwan Events — POST /api/chat.
 *
 * Mesmo backend do Jaiminho (apps/events/gwan-events-backend, porta 3001) —
 * dois controllers, um processo so.
 */
const HEALTH_URL = 'http://localhost:3001/api/health';
const CHAT_URL = 'http://localhost:3001/api/chat';

test('Gwan Events', async ({ page, request, demo }) => {
  await demo.scene('Gwan Events', '/bot-gwan-events · POST /api/chat');

  const health = await demo.checkBackend(request, HEALTH_URL);
  if (!health.reachable) {
    await page.goto('/bot-gwan-events');
    await demo.say(
      'Backend indisponivel — pulando teste de envio de mensagem.'
    );
    await demo.verdict({
      botName: 'Gwan Events',
      route: '/bot-gwan-events',
      healthUrl: HEALTH_URL,
      chatUrl: CHAT_URL,
      outcome: 'blocked',
      reason: `Backend nao respondeu em ${HEALTH_URL}: ${health.detail}`,
    });
    return;
  }

  await page.goto('/bot-gwan-events');
  await demo.say('Backend de pe. Perguntando sobre eventos disponiveis...');

  const input = page.locator('input[placeholder="Mensagem"]');
  const sendButton = page.locator('form button[type="submit"]');

  await demo.type(input, 'Quais eventos estao disponiveis?');

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
      // Causa reproduzida localmente: OPENAI_API_KEY placeholder no .env do backend.
      outcome = 'blocked';
      reason = `Backend respondeu HTTP ${httpStatus} — provavel OPENAI_API_KEY ausente/invalida em gwan-events-backend/.env (ver logs do backend).`;
    }
    await demo.beat(900);
  } catch (err) {
    outcome = 'fail';
    reason = `Erro aguardando resposta: ${err instanceof Error ? err.message : String(err)}`;
  }

  await demo.verdict({
    botName: 'Gwan Events',
    route: '/bot-gwan-events',
    healthUrl: HEALTH_URL,
    chatUrl: CHAT_URL,
    outcome,
    reason,
    httpStatus,
    responseExcerpt: excerpt,
  });
});
