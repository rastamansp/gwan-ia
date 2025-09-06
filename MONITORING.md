# 📊 Monitoramento APM - Gwan IA

## 🔍 **Ferramentas de Monitoramento**

### **Jaeger - Visualização de Traces**
- **Interface Web**: [http://jaeger.gwan.com.br/](http://jaeger.gwan.com.br/)
- **Página de Busca**: [http://jaeger.gwan.com.br/search](http://jaeger.gwan.com.br/search)

### **Kibana - Visualização de Logs**
- **Interface Web**: [http://kibana.gwan.com.br/](http://kibana.gwan.com.br/)
- **Dashboards**: [http://kibana.gwan.com.br/app/dashboards](http://kibana.gwan.com.br/app/dashboards)
- **Discover**: [http://kibana.gwan.com.br/app/discover](http://kibana.gwan.com.br/app/discover)

### **Prometheus - Monitoramento**
- **Interface Web**: [http://prometheus.gwan.com.br/](http://prometheus.gwan.com.br/)
- **Targets**: [http://prometheus.gwan.com.br/targets](http://prometheus.gwan.com.br/targets)
- **Graph**: [http://prometheus.gwan.com.br/graph](http://prometheus.gwan.com.br/graph)

### **Alertmanager - Alertas**
- **Interface Web**: [http://alertmanager.gwan.com.br/](http://alertmanager.gwan.com.br/)
- **Alertas**: [http://alertmanager.gwan.com.br/#/alerts](http://alertmanager.gwan.com.br/#/alerts)

## 🚀 **Integração com Gwan IA**

### **OpenTelemetry Collector**
- **OTLP gRPC**: `http://gwan.com.br:4317`
- **OTLP HTTP**: `http://gwan.com.br:4318`

## 📋 **Configuração no Docker Compose**

### **Variáveis de Ambiente Adicionais:**
```env
# Monitoramento APM
OTEL_EXPORTER_OTLP_ENDPOINT=http://gwan.com.br:4317
OTEL_SERVICE_NAME=gwan-ia-frontend
OTEL_SERVICE_VERSION=1.0.0
OTEL_RESOURCE_ATTRIBUTES=service.name=gwan-ia-frontend,service.version=1.0.0

# Logs
LOG_LEVEL=info
LOG_FORMAT=json
```

### **Labels Traefik para Monitoramento:**
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.gwan-site.rule=Host(`gwan.com.br`)"
  - "traefik.http.routers.gwan-site.entrypoints=websecure"
  - "traefik.http.routers.gwan-site.tls.certresolver=letsencrypt"
  - "traefik.http.services.gwan-site.loadbalancer.server.port=80"
  - "traefik.docker.network=gwan"
  
  # Monitoramento
  - "prometheus.enable=true"
  - "prometheus.port=80"
  - "prometheus.path=/metrics"
```

## 🔧 **Implementação**

### **1. Instrumentação OpenTelemetry**
- Adicionar bibliotecas OpenTelemetry ao projeto
- Configurar traces para requisições HTTP
- Configurar métricas para performance
- Configurar logs estruturados

### **2. Configuração de Logs**
- Logs em formato JSON
- Níveis de log configuráveis
- Contexto de request ID
- Timestamps estruturados

### **3. Métricas Personalizadas**
- Tempo de resposta das páginas
- Taxa de erro por rota
- Uso de memória e CPU
- Número de usuários ativos

## 📊 **Dashboards Sugeridos**

### **Kibana - Logs**
- **Erros por minuto**
- **Requisições por rota**
- **Tempo de resposta**
- **Usuários únicos**

### **Prometheus - Métricas**
- **Taxa de erro HTTP**
- **Tempo de resposta p95**
- **Uso de recursos**
- **Health checks**

### **Jaeger - Traces**
- **Fluxo de requisições**
- **Tempo de renderização**
- **Chamadas de API**
- **Performance de componentes**

## 🚨 **Alertas Configurados**

### **Alertmanager**
- **Site indisponível** (> 5% de erro)
- **Tempo de resposta alto** (> 2s)
- **Uso de memória crítico** (> 80%)
- **Health check falhando**

## ✅ **Checklist de Implementação**

- [ ] Configurar OpenTelemetry no frontend
- [ ] Adicionar logs estruturados
- [ ] Configurar métricas personalizadas
- [ ] Testar integração com Jaeger
- [ ] Testar integração com Kibana
- [ ] Testar integração com Prometheus
- [ ] Configurar alertas no Alertmanager
- [ ] Criar dashboards personalizados

## 🎯 **Benefícios**

- ✅ **Visibilidade completa** da aplicação
- ✅ **Detecção proativa** de problemas
- ✅ **Análise de performance** detalhada
- ✅ **Logs centralizados** e pesquisáveis
- ✅ **Alertas automáticos** para problemas críticos
- ✅ **Métricas de negócio** e técnicas

---

**💡 Integração completa com o sistema APM existente!**
