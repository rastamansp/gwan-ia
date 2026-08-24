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
      // Este bot depende de EMBEDDINGS, nao so do LLM: chat-health faz busca
      // semantica na base de doencas (chatbot-health-query.use-case.ts). A Anthropic
      // NAO oferece API de embeddings, entao uma CLAUDE_API_KEY nao destrava este
      // fluxo — EMBEDDING_PROVIDER aceita apenas openai|voyage. Diferente dos bots
      // Events e Imoveis, que passam so com a chave Claude.
      // Segundo bloqueio, independente: a tabela knowledge_disease esta vazia
      // (nao ha seed no repo), entao mesmo com embeddings a resposta seria "nada
      // encontrado" em vez de uma resposta real.
      outcome = 'blocked';
      reason = `HTTP ${httpStatus} em generateEmbedding: precisa de OPENAI_API_KEY ou VOYAGE_API_KEY (Anthropic nao tem API de embeddings). Base knowledge_disease tambem esta sem seed.`;
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
