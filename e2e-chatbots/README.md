# Avaliação de funcionamento dos chatbots — Playwright

Grava um vídeo por bot (Jaiminho/Gwan Saúde, Mart, Imóveis, Events) provando se ele
responde de verdade, e escreve um veredito estruturado em `out/report.ndjson`. Isto é
**QA**, não vídeo institucional/marketing — cada cena é um teste real: health-check
pré-voo, envio de mensagem pela UI, espera pela resposta de rede real do backend, e
assert sobre o payload.

## Rodar

```bash
# 1. Backends locais no ar (ver "Topologia" abaixo) + este frontend em :5173
npm run chatbots:eval      # grava as 4 cenas, escreve out/report.ndjson
npm run chatbots:render    # monta out/avaliacao-chatbots.mp4 + .vtt + .jpg (Docker)
```

Cada rodada de `chatbots:eval` **limpa `out/`** (globalSetup) — o relatório é sempre
do estado atual, não acumula tentativas antigas.

## Topologia real (não é o que a doc do SDD sugere)

Investigando o código-fonte descobri que a arquitetura real diverge da documentada
em `docs/spec/10-features/funcionalidades.md` (F02):

| Bot | Rota | Backend real | Porta local |
|---|---|---|---|
| **Jaiminho / Gwan Saúde** | `/bot-jaiminho` | `apps/events/gwan-events-backend` — `POST /api/chat-health` | 3001 |
| **Gwan Events** | `/bot-gwan-events` | **o mesmo** `gwan-events-backend` — `POST /api/chat` | 3001 |
| **Gwan Imóveis** | `/bot-gwan-imoveis` | `apps/imoveis/gwan-imoveis-backend` — `POST /api/chat` | 3009 |
| **Gwan Mart** | `/bot-gwan-mart` | ❌ não existe localmente — ver abaixo | — |
| Marley / Gwan (institucional) | `/bot-marley` / `/bot-gwan` | Webhooks n8n hardcoded em `n8n.gwan.com.br` no código-fonte, comentados como "temporariamente desabilitado" na home | fora de escopo |
| Bíblia | `/bot-biblia` | Não é IA real — conversa 100% roteirizada (`if input.includes(...)`) no front | fora de escopo |

Jaiminho e Events são o **mesmo processo Node** — um detalhe que não está documentado
em lugar nenhum e só apareceu ao ler `src/chat-health/` dentro de `gwan-events-backend`.

## Por que os 3 bots reais aparecem "bloqueados"

Todos os três (Jaiminho, Imóveis, Events) sobem, respondem ao health-check, recebem a
mensagem de teste, e falham com HTTP 500 porque o `.env` de cada backend tem uma
`OPENAI_API_KEY` placeholder (`REPLACE_ME_COM_SUA_OPENAI_API_KEY`). Confirmado direto
no log do backend: `Incorrect API key provided: REPLACE_***_KEY`.

**Para desbloquear**: edite os dois arquivos abaixo com uma chave OpenAI real e
reinicie os backends (`npm run start:dev` em cada pasta) — nenhum código muda, só a
env var:

- `apps/imoveis/gwan-imoveis-backend/.env` → `OPENAI_API_KEY=`
- `apps/events/gwan-events-backend/.env` → `OPENAI_API_KEY=` (serve Jaiminho **e** Events)

O Mart é bloqueio de **infraestrutura**, não de config: `apps/mart-backend/` nesta
máquina só tem um README dizendo "aguardando extração do Portainer" — mas o repo
`gwan-mart-backend` **existe** no GitHub (confirmado via `git ls-remote`; o README está
desatualizado). Onboardar o Mart é um trabalho à parte: clonar o repo, criar
`docker-compose.infra.yml`/`make.ps1` seguindo o padrão de `apps/imoveis/`, e então
trocar `VITE_GWAN_MART_CHAT_URL` no `.env.local` deste frontend para a porta real.

## Setup local completo (para reproduzir do zero)

```bash
# Imoveis
cd apps/imoveis && cp .env.infra.example .env.infra
docker compose -f docker-compose.infra.yml --env-file .env.infra up -d postgres redis
cd gwan-imoveis-backend && npm install
# criar .env (ver template no README de apps/imoveis/CLAUDE.md) com
# DATABASE_URL=postgresql://postgres:password@localhost:5432/gwan_imoveis
# e OPENAI_API_KEY real
npm run start:dev   # porta 3009

# Events (serve Jaiminho + Events)
cd apps/events
docker compose -f docker-compose.dev.yml --env-file .env.dev up -d   # postgres :5435
cd gwan-events-backend && npm install
# .env: DATABASE_URL=postgresql://postgres:postgres@localhost:5435/gwan_events
#       DATABASE_KWNOWLEDGE_URL=<mesma URL>  (nome com o typo "KWNOWLEDGE" no codigo-fonte)
#       OPENAI_API_KEY real
npm run start:dev   # porta 3001

# Frontend (gwan-ia)
cd apps/ia/gwan-ia
# .env.local precisa de VITE_API_URL / VITE_APP_NAME / VITE_APP_VERSION (obrigatorias,
# ver src/config/env.ts) + as VITE_GWAN_*_CHAT_URL / VITE_CHAT_HEALTH_API_URL apontando
# para as portas acima — ATENCAO: sao a BASE da API sem "/chat" no final (ver comentario
# no proprio .env.local, o client ja concatena "/chat")
npx vite --port 5173 --strictPort
```

## Duas armadilhas reais encontradas (documentadas para não repetir)

1. **Validador de ambiente bloqueia a aplicação inteira.** `src/config/env.ts` exige
   `VITE_API_URL`, `VITE_APP_NAME`, `VITE_APP_VERSION` — sem elas, **nenhuma** rota
   renderiza (nem as de bot), e o Playwright trava 60s esperando um input que nunca
   aparece, sem nenhuma pista no relatório do teste. Diagnosticado só com
   `page.on('pageerror', ...)`.
2. **`VITE_GWAN_*_CHAT_URL` é a base, não o endpoint.** `ChatRepository.sendMessage()`
   já faz `httpClient.post('/chat', ...)`. Se a env var já incluir `/chat`, o request
   final vira `.../chat/chat` (404 silencioso do ponto de vista da UI — só aparece como
   timeout no `waitForResponse`). Só o Jaiminho foge da regra: `BotJaiminhoPage.tsx`
   remove o sufixo `/chat-health` antes de montar o client.

## Arquivos

```
playwright.chatbots.config.ts    # 1080p, video:on, globalSetup limpa out/
e2e-chatbots/
├── fixtures/
│   ├── eval.ts          # scene/say/type/click + checkBackend + verdict (grava relatorio)
│   ├── cursor.ts         # cursor sintetico (copiado do template demo-video)
│   ├── caption.ts        # legendas/cartelas + cartela de veredito verde/vermelha
│   └── global-setup.ts   # limpa out/ antes de cada rodada
├── scenes/NN-*.eval.ts   # 1 arquivo por bot
├── render/               # assemble.mjs (ffmpeg em container) + compose
└── out/                  # gerado, nao versionar (video, report.ndjson, manifest/)
```
