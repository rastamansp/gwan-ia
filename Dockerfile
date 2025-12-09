# Multi-stage build para otimizar o tamanho da imagem
FROM node:20-alpine AS base

# Stage de build
FROM base AS builder
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Instalar todas as dependências (incluindo devDependencies) para o build
# Usa npm ci se package-lock.json existir, caso contrário usa npm install
RUN if [ -f package-lock.json ]; then \
      echo "Using package-lock.json" && npm ci --ignore-scripts --legacy-peer-deps || (echo "npm ci failed, trying npm install" && npm install --ignore-scripts --legacy-peer-deps); \
    else \
      echo "No package-lock.json found, running npm install" && npm install --ignore-scripts --legacy-peer-deps; \
    fi && \
    echo "Dependencies installed successfully" && \
    npm list --depth=0 || true

# Copiar código fonte
COPY . .

# Definir variáveis de ambiente para o build (apenas as necessárias para frontend)
ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_APP_VERSION
ARG VITE_BUILD_TIME
ARG VITE_GIT_COMMIT
ARG VITE_GIT_BRANCH
ARG VITE_LOG_LEVEL
ARG VITE_OTEL_EXPORTER_OTLP_ENDPOINT
ARG VITE_OTEL_SERVICE_NAME
ARG VITE_OTEL_SERVICE_VERSION
ARG VITE_OTEL_RESOURCE_ATTRIBUTES
ARG VITE_GWAN_MART_API_URL
ARG VITE_GWAN_MART_CHAT_URL
ARG VITE_GWAN_EVENT_URL
ARG VITE_GWAN_EVENTS_CHAT_URL
ARG VITE_GWAN_IMOVEIS_CHAT_URL
ARG VITE_GWAN_LEGAL_AI_URL
ARG VITE_CHAT_HEALTH_API_URL

# Definir variáveis de ambiente
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_BUILD_TIME=$VITE_BUILD_TIME
ENV VITE_GIT_COMMIT=$VITE_GIT_COMMIT
ENV VITE_GIT_BRANCH=$VITE_GIT_BRANCH
ENV VITE_LOG_LEVEL=$VITE_LOG_LEVEL
ENV VITE_OTEL_EXPORTER_OTLP_ENDPOINT=$VITE_OTEL_EXPORTER_OTLP_ENDPOINT
ENV VITE_OTEL_SERVICE_NAME=$VITE_OTEL_SERVICE_NAME
ENV VITE_OTEL_SERVICE_VERSION=$VITE_OTEL_SERVICE_VERSION
ENV VITE_OTEL_RESOURCE_ATTRIBUTES=$VITE_OTEL_RESOURCE_ATTRIBUTES
ENV VITE_GWAN_MART_API_URL=$VITE_GWAN_MART_API_URL
ENV VITE_GWAN_MART_CHAT_URL=$VITE_GWAN_MART_CHAT_URL
ENV VITE_GWAN_EVENT_URL=$VITE_GWAN_EVENT_URL
ENV VITE_GWAN_EVENTS_CHAT_URL=$VITE_GWAN_EVENTS_CHAT_URL
ENV VITE_GWAN_IMOVEIS_CHAT_URL=$VITE_GWAN_IMOVEIS_CHAT_URL
ENV VITE_GWAN_LEGAL_AI_URL=$VITE_GWAN_LEGAL_AI_URL
ENV VITE_CHAT_HEALTH_API_URL=$VITE_CHAT_HEALTH_API_URL

# Build da aplicação (tsc && vite build)
RUN echo "Building application..." && npm run build

# Verificar se o build foi bem-sucedido
RUN ls -la /app/dist && \
    echo "Build completed successfully" && \
    echo "Dist directory contents:" && \
    find /app/dist -type f -name "*.html" -o -name "*.js" -o -name "*.css" | head -10

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
