# Multi-stage build para otimizar o tamanho da imagem
FROM node:18-alpine AS base

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Stage de dependências
FROM base AS deps
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Stage de build
FROM base AS builder
WORKDIR /app

# Copiar dependências instaladas
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Definir variáveis de ambiente para o build
ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_APP_VERSION
ARG VITE_SMTP_HOST
ARG VITE_SMTP_PORT
ARG VITE_SMTP_SECURE
ARG VITE_SMTP_USER
ARG VITE_SMTP_PASSWORD
ARG VITE_SMTP_FROM_NAME
ARG VITE_SMTP_FROM_EMAIL
ARG VITE_ADMIN_EMAIL
ARG VITE_ADMIN_PASSWORD
ARG VITE_ADMIN_NAME
ARG VITE_CHATWOOT_KEY
ARG VITE_BUILD_TIME
ARG VITE_GIT_COMMIT
ARG VITE_GIT_BRANCH

# Definir variáveis de ambiente
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_SMTP_HOST=$VITE_SMTP_HOST
ENV VITE_SMTP_PORT=$VITE_SMTP_PORT
ENV VITE_SMTP_SECURE=$VITE_SMTP_SECURE
ENV VITE_SMTP_USER=$VITE_SMTP_USER
ENV VITE_SMTP_PASSWORD=$VITE_SMTP_PASSWORD
ENV VITE_SMTP_FROM_NAME=$VITE_SMTP_FROM_NAME
ENV VITE_SMTP_FROM_EMAIL=$VITE_SMTP_FROM_EMAIL
ENV VITE_ADMIN_EMAIL=$VITE_ADMIN_EMAIL
ENV VITE_ADMIN_PASSWORD=$VITE_ADMIN_PASSWORD
ENV VITE_ADMIN_NAME=$VITE_ADMIN_NAME
ENV VITE_CHATWOOT_KEY=$VITE_CHATWOOT_KEY
ENV VITE_BUILD_TIME=$VITE_BUILD_TIME
ENV VITE_GIT_COMMIT=$VITE_GIT_COMMIT
ENV VITE_GIT_BRANCH=$VITE_GIT_BRANCH

# Build da aplicação
RUN pnpm build

# Stage de produção
FROM nginx:alpine AS production

# Instalar wget para health check
RUN apk add --no-cache wget

# Copiar arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
