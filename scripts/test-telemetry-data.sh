#!/bin/bash

# ========================================
# Script de Teste de Telemetria - Gwan IA
# ========================================

echo "🧪 TESTE DE TELEMETRIA - GWAN IA"
echo "================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}ℹ️  COMO GERAR DADOS DE TELEMETRIA:${NC}"
echo ""

echo "1. 📱 ACESSE A APLICAÇÃO:"
echo "   http://localhost:3001"
echo ""

echo "2. 🔍 ABRA O CONSOLE DO NAVEGADOR (F12):"
echo "   - Vá em Console"
echo "   - Veja logs estruturados em tempo real"
echo ""

echo "3. 🌐 NAVEGUE PELO SITE:"
echo "   - Clique em diferentes páginas"
echo "   - Faça requisições (se houver API)"
echo "   - Interaja com elementos"
echo ""

echo "4. 📊 VERIFIQUE OS DADOS GERADOS:"
echo ""

echo -e "${GREEN}✅ TRACES (Jaeger):${NC}"
echo "   URL: http://jaeger.gwan.com.br/search"
echo "   Serviço: gwan-ia-frontend"
echo "   Dados: Requisições, navegação, performance"
echo ""

echo -e "${GREEN}✅ LOGS (Kibana):${NC}"
echo "   URL: http://kibana.gwan.com.br/app/discover"
echo "   Índice: gwan-ia-frontend-*"
echo "   Dados: Logs estruturados, ações do usuário"
echo ""

echo -e "${GREEN}✅ MÉTRICAS (Prometheus):${NC}"
echo "   URL: http://prometheus.gwan.com.br/targets"
echo "   Target: gwan-ia-frontend"
echo "   Dados: Performance, contadores, Web Vitals"
echo ""

echo -e "${BLUE}ℹ️  DADOS QUE SERÃO GERADOS:${NC}"
echo ""

echo "📱 NAVEGAÇÃO:"
echo "   - Page views (mudanças de rota)"
echo "   - Tempo de carregamento"
echo "   - Interações do usuário"
echo ""

echo "🌐 REQUISIÇÕES HTTP:"
echo "   - Todas as chamadas de API"
echo "   - Tempo de resposta"
echo "   - Status codes"
echo "   - Tamanho das requisições"
echo ""

echo "⚡ PERFORMANCE:"
echo "   - Web Vitals (LCP, FID, CLS)"
echo "   - Uso de memória"
echo "   - Tempo de renderização"
echo ""

echo "🔍 DEBUGGING:"
echo "   - Logs estruturados"
echo "   - Trace IDs para correlação"
echo "   - Span IDs para rastreamento"
echo ""

echo -e "${BLUE}ℹ️  COMANDOS DE TESTE:${NC}"
echo ""

echo "# 1. Verificar se aplicação está rodando"
echo "curl -s http://localhost:3001 | head -5"
echo ""

echo "# 2. Verificar logs no console do navegador"
echo "# Abra F12 > Console e procure por:"
echo "# - Logs estruturados JSON"
echo "# - Trace IDs"
echo "# - Span IDs"
echo ""

echo "# 3. Verificar se dados estão sendo enviados"
echo "# No console do navegador, execute:"
echo "getTelemetryStatus()"
echo "isTelemetryWorking()"
echo ""

echo -e "${YELLOW}💡 DICAS IMPORTANTES:${NC}"
echo ""

echo "1. 🔄 DADOS EM TEMPO REAL:"
echo "   - Jaeger atualiza a cada 5-10 segundos"
echo "   - Kibana atualiza conforme configurado"
echo "   - Prometheus coleta a cada 15 segundos"
echo ""

echo "2. 🔍 CORRELAÇÃO DE DADOS:"
echo "   - Use Trace ID para correlacionar logs e traces"
echo "   - Span ID para rastrear operações específicas"
echo "   - Timestamp para alinhar dados entre sistemas"
echo ""

echo "3. 📊 FILTROS ÚTEIS:"
echo "   - Jaeger: Filtre por serviço e tempo"
echo "   - Kibana: Filtre por nível de log e componente"
echo "   - Prometheus: Filtre por métrica específica"
echo ""

echo -e "${GREEN}🎯 RESULTADO ESPERADO:${NC}"
echo ""

echo "✅ Console do navegador mostra logs estruturados"
echo "✅ Jaeger mostra traces de navegação"
echo "✅ Kibana mostra logs detalhados"
echo "✅ Prometheus coleta métricas de performance"
echo ""

echo -e "${BLUE}ℹ️  PRÓXIMOS PASSOS:${NC}"
echo ""

echo "1. 🌐 Acesse a aplicação e navegue"
echo "2. 🔍 Verifique o console do navegador"
echo "3. 📊 Acesse Jaeger para ver traces"
echo "4. 📝 Acesse Kibana para ver logs"
echo "5. 📈 Acesse Prometheus para ver métricas"
echo ""

echo "✅ Script de teste concluído!"
