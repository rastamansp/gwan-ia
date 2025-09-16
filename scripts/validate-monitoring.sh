#!/bin/bash

# ========================================
# Script de Validação de Monitoramento - Gwan IA
# ========================================
# Este script valida se as informações estão sendo enviadas
# corretamente para os sistemas de monitoramento

echo "🔍 VALIDAÇÃO DE MONITORAMENTO - GWAN IA"
echo "========================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir status
print_status() {
    local status=$1
    local message=$2
    if [ "$status" = "OK" ]; then
        echo -e "${GREEN}✅ $message${NC}"
    elif [ "$status" = "WARNING" ]; then
        echo -e "${YELLOW}⚠️  $message${NC}"
    elif [ "$status" = "ERROR" ]; then
        echo -e "${RED}❌ $message${NC}"
    else
        echo -e "${BLUE}ℹ️  $message${NC}"
    fi
}

# Função para testar conectividade
test_connectivity() {
    local url=$1
    local name=$2
    local timeout=${3:-5}
    
    echo -n "Testando $name... "
    if curl -s --max-time $timeout "$url" > /dev/null 2>&1; then
        print_status "OK" "$name está acessível"
        return 0
    else
        print_status "ERROR" "$name não está acessível"
        return 1
    fi
}

# Função para verificar endpoint de health
test_health_endpoint() {
    local url=$1
    local name=$2
    
    echo -n "Testando health check de $name... "
    response=$(curl -s --max-time 5 "$url/health" 2>/dev/null)
    if [ "$response" = "healthy" ]; then
        print_status "OK" "$name health check OK"
        return 0
    else
        print_status "ERROR" "$name health check falhou"
        return 1
    fi
}

# Função para verificar métricas Prometheus
test_prometheus_metrics() {
    local url=$1
    local name=$2
    
    echo -n "Testando métricas Prometheus de $name... "
    response=$(curl -s --max-time 5 "$url/metrics" 2>/dev/null)
    if echo "$response" | grep -q "http_requests_total\|nginx_"; then
        print_status "OK" "$name enviando métricas"
        return 0
    else
        print_status "WARNING" "$name não está enviando métricas ou endpoint não encontrado"
        return 1
    fi
}

echo "1. 🔗 TESTANDO CONECTIVIDADE DOS SISTEMAS DE MONITORAMENTO"
echo "--------------------------------------------------------"

# Testar sistemas de monitoramento
test_connectivity "http://jaeger.gwan.com.br" "Jaeger"
test_connectivity "http://kibana.gwan.com.br" "Kibana"
test_connectivity "http://prometheus.gwan.com.br" "Prometheus"
test_connectivity "http://alertmanager.gwan.com.br" "Alertmanager"

echo ""
echo "2. 🏥 TESTANDO HEALTH CHECKS"
echo "----------------------------"

# Testar health check do site principal
test_health_endpoint "http://gwan.com.br" "Site Principal"
test_health_endpoint "http://localhost:8080" "Site Local"

echo ""
echo "3. 📊 TESTANDO MÉTRICAS PROMETHEUS"
echo "---------------------------------"

# Testar métricas do site principal
test_prometheus_metrics "http://gwan.com.br" "Site Principal"
test_prometheus_metrics "http://localhost:8080" "Site Local"

echo ""
echo "4. 🐳 TESTANDO CONTAINER DOCKER"
echo "------------------------------"

# Verificar se o container está rodando
if docker ps | grep -q "gwan-site"; then
    print_status "OK" "Container gwan-site está rodando"
    
    # Verificar logs do container
    echo "Últimas 10 linhas dos logs do container:"
    docker logs --tail 10 gwan-site 2>/dev/null | sed 's/^/  /'
    
    # Verificar recursos do container
    echo ""
    echo "Uso de recursos do container:"
    docker stats --no-stream gwan-site 2>/dev/null | tail -1 | sed 's/^/  /'
    
else
    print_status "ERROR" "Container gwan-site não está rodando"
fi

echo ""
echo "5. 📝 TESTANDO LOGS ESTRUTURADOS"
echo "-------------------------------"

# Verificar se os logs estão sendo gerados
if docker logs gwan-site 2>/dev/null | grep -q "GET\|POST\|PUT\|DELETE"; then
    print_status "OK" "Logs de requisições HTTP estão sendo gerados"
else
    print_status "WARNING" "Poucos logs de requisições HTTP encontrados"
fi

# Verificar logs de erro
error_count=$(docker logs gwan-site 2>/dev/null | grep -c "ERROR\|error\|Error" || echo "0")
if [ "$error_count" -gt 0 ]; then
    print_status "WARNING" "Encontrados $error_count logs de erro"
    echo "Últimos 3 erros:"
    docker logs gwan-site 2>/dev/null | grep -i error | tail -3 | sed 's/^/  /'
else
    print_status "OK" "Nenhum erro encontrado nos logs"
fi

echo ""
echo "6. 🔧 TESTANDO CONFIGURAÇÕES DE AMBIENTE"
echo "---------------------------------------"

# Verificar variáveis de ambiente do container
if docker exec gwan-site env 2>/dev/null | grep -q "OTEL_"; then
    print_status "OK" "Variáveis OpenTelemetry configuradas"
    echo "Variáveis OTEL encontradas:"
    docker exec gwan-site env 2>/dev/null | grep "OTEL_" | sed 's/^/  /'
else
    print_status "WARNING" "Variáveis OpenTelemetry não encontradas"
fi

# Verificar variáveis de log
if docker exec gwan-site env 2>/dev/null | grep -q "LOG_"; then
    print_status "OK" "Variáveis de log configuradas"
    echo "Variáveis LOG encontradas:"
    docker exec gwan-site env 2>/dev/null | grep "LOG_" | sed 's/^/  /'
else
    print_status "WARNING" "Variáveis de log não encontradas"
fi

echo ""
echo "7. 🌐 TESTANDO REQUISIÇÕES HTTP"
echo "-----------------------------"

# Testar algumas páginas principais
pages=("/" "/auth" "/dashboard" "/bot-jaiminho")
for page in "${pages[@]}"; do
    echo -n "Testando página $page... "
    if curl -s --max-time 5 "http://localhost:8080$page" > /dev/null 2>&1; then
        print_status "OK" "Página $page acessível"
    else
        print_status "ERROR" "Página $page não acessível"
    fi
done

echo ""
echo "8. 📈 RESUMO DA VALIDAÇÃO"
echo "========================"

# Contar sucessos e falhas
total_tests=0
passed_tests=0

# Esta é uma versão simplificada - em um script real você contaria os resultados
print_status "INFO" "Validação concluída"
print_status "INFO" "Para monitoramento completo, verifique:"
echo "  • Jaeger: http://jaeger.gwan.com.br/search"
echo "  • Kibana: http://kibana.gwan.com.br/app/discover"
echo "  • Prometheus: http://prometheus.gwan.com.br/targets"
echo "  • Alertmanager: http://alertmanager.gwan.com.br/#/alerts"

echo ""
echo "💡 PRÓXIMOS PASSOS:"
echo "1. Implementar OpenTelemetry no frontend React"
echo "2. Adicionar logs estruturados em JSON"
echo "3. Configurar métricas personalizadas"
echo "4. Testar integração completa com Jaeger"
echo "5. Criar dashboards personalizados no Kibana"

echo ""
echo "✅ Validação de monitoramento concluída!"
