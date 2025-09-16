#!/bin/bash

# ========================================
# Demonstração da Validação de Ambiente - Gwan IA
# ========================================
# Este script demonstra como a validação de ambiente funciona

echo "🧪 DEMONSTRAÇÃO DA VALIDAÇÃO DE AMBIENTE - GWAN IA"
echo "================================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}ℹ️  COMO FUNCIONA A VALIDAÇÃO:${NC}"
echo ""
echo "1. A validação é executada automaticamente no arquivo main.tsx"
echo "2. ANTES de inicializar o React, a aplicação valida todas as configurações"
echo "3. Se alguma configuração estiver faltando ou inválida, a aplicação NÃO inicia"
echo "4. Um erro detalhado é exibido no console e na tela"
echo ""

echo -e "${BLUE}ℹ️  CONFIGURAÇÕES OBRIGATÓRIAS POR AMBIENTE:${NC}"
echo ""

echo -e "${YELLOW}📋 DESENVOLVIMENTO:${NC}"
echo "  ✅ VITE_API_URL (URL válida)"
echo "  ✅ VITE_APP_NAME (não vazio)"
echo "  ✅ VITE_APP_VERSION (formato semântico: 1.0.0)"
echo ""

echo -e "${YELLOW}📋 PRODUÇÃO:${NC}"
echo "  ✅ VITE_API_URL (URL válida + HTTPS obrigatório)"
echo "  ✅ VITE_APP_NAME (não vazio)"
echo "  ✅ VITE_APP_VERSION (formato semântico: 1.0.0)"
echo "  ✅ OTEL_EXPORTER_OTLP_ENDPOINT (URL válida)"
echo "  ✅ OTEL_SERVICE_NAME (não vazio)"
echo "  ✅ OTEL_SERVICE_VERSION (formato semântico: 1.0.0)"
echo "  ✅ VITE_LOG_LEVEL (debug, info, warn ou error)"
echo ""

echo -e "${BLUE}ℹ️  EXEMPLOS DE VALIDAÇÃO:${NC}"
echo ""

echo -e "${GREEN}✅ CONFIGURAÇÃO VÁLIDA:${NC}"
echo "VITE_API_URL=https://api.gwan.com.br"
echo "VITE_APP_NAME=Gwan IA"
echo "VITE_APP_VERSION=1.0.0"
echo "OTEL_EXPORTER_OTLP_ENDPOINT=http://gwan.com.br:4317"
echo ""

echo -e "${RED}❌ CONFIGURAÇÕES INVÁLIDAS:${NC}"
echo "VITE_API_URL=invalid-url          # ❌ URL inválida"
echo "VITE_APP_NAME=                     # ❌ Nome vazio"
echo "VITE_APP_VERSION=1.0               # ❌ Formato inválido"
echo "OTEL_EXPORTER_OTLP_ENDPOINT=ftp://gwan.com.br:4317  # ❌ Protocolo inválido"
echo ""

echo -e "${BLUE}ℹ️  COMO TESTAR A VALIDAÇÃO:${NC}"
echo ""

echo "1. Crie um arquivo .env com configurações incompletas:"
echo "   cp env.example .env"
echo "   # Edite o .env e remova algumas variáveis obrigatórias"
echo ""

echo "2. Tente iniciar a aplicação:"
echo "   pnpm dev"
echo ""

echo "3. A aplicação mostrará um erro detalhado e não iniciará:"
echo "   🚨 ERRO DE CONFIGURAÇÃO DE AMBIENTE 🚨"
echo "   ❌ Variável de ambiente VITE_API_URL não está definida"
echo "   ❌ Variável de ambiente VITE_APP_NAME não está definida"
echo ""

echo "4. Corrija as configurações e reinicie:"
echo "   # Adicione as variáveis faltantes no .env"
echo "   pnpm dev"
echo ""

echo -e "${BLUE}ℹ️  ARQUIVOS ENVOLVIDOS:${NC}"
echo ""
echo "📁 src/main.tsx"
echo "   - Chama initializeEnvironmentValidation() ANTES de inicializar o React"
echo ""
echo "📁 src/utils/env-validation.ts"
echo "   - Contém toda a lógica de validação"
echo "   - Validações específicas por ambiente"
echo "   - Mensagens de erro detalhadas"
echo ""
echo "📁 src/config/env.ts"
echo "   - Define as interfaces TypeScript"
echo "   - Centraliza acesso às variáveis de ambiente"
echo ""

echo -e "${BLUE}ℹ️  BENEFÍCIOS:${NC}"
echo ""
echo "✅ Previne aplicação de subir com configurações incorretas"
echo "✅ Erros claros e detalhados para facilitar correção"
echo "✅ Validação específica por ambiente (dev/prod)"
echo "✅ Validação de formato (URLs, versões, etc.)"
echo "✅ Falha rápida - não desperdiça tempo com builds inválidos"
echo ""

echo -e "${GREEN}🎯 RESULTADO:${NC}"
echo "A aplicação só inicia se TODAS as configurações estiverem corretas!"
echo ""

echo -e "${YELLOW}💡 PRÓXIMOS PASSOS:${NC}"
echo "1. Teste removendo variáveis do arquivo .env"
echo "2. Tente iniciar a aplicação para ver os erros"
echo "3. Corrija as configurações e teste novamente"
echo "4. A validação funciona automaticamente - sem scripts necessários!"
echo ""

echo "✅ Demonstração concluída!"
