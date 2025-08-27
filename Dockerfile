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
