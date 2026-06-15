# Gwan IA — Site Institucional

> Site institucional GWAN (frontend React/Vite) do ecossistema [gwan.cloud](https://gwan.cloud).

## O que é

Frontend institucional da GWAN. Faz par com a **API principal** (NestJS, repo
[gwan-backend](https://github.com/rastamansp/gwan-backend)); este repositório
([gwan-ia](https://github.com/rastamansp/gwan-ia)) é o **site** React 18 + Vite + TypeScript + Tailwind.

## Status

| Ambiente | URL | Estado |
|----------|-----|--------|
| Site (produção) | https://gwan.cloud | 🟢 operacional |
| API (produção) | https://api.gwan.cloud/api/v1 | — |
| Health | https://gwan.cloud/health | — |
| Local | http://localhost:5173 (web) · :3000 (API) | slot 0 |

## Stack

- **Web:** React 18 + Vite + TypeScript + Tailwind
- **API (repo gwan-backend):** NestJS, Clean Architecture, prefixo `api/v1`, Postgres (pgvector) + RabbitMQ

## Como rodar localmente

```powershell
cd apps/ia
.\make.ps1 bootstrap   # clona + sanitiza backend + npm install
.\make.ps1 infra:up    # Postgres pgvector :5433 + RabbitMQ :5672
.\make.ps1 dev         # backend :3000 + frontend :5173
```

Linux/macOS: `make bootstrap && make infra-up && make dev`.

## Documentação

O **SDD do app** está versionado no monorepo de infraestrutura
[gwan-infra](https://github.com/rastamansp/gwan-infra), em `apps/ia/docs/spec/`, e publicado
no [site de docs do gwan-infra](https://rastamansp.github.io/gwan-infra/).

## Links

- Repositório (site): https://github.com/rastamansp/gwan-ia
- API: https://github.com/rastamansp/gwan-backend
- Infra / orquestração / SDD: https://github.com/rastamansp/gwan-infra
