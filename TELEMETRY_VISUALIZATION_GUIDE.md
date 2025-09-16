# 📊 Guia Completo - Visualizando Dados de Telemetria

## 🎯 **Resumo Rápido**

Para ver os dados gerados pela navegação no site, acesse:

1. **🔍 Traces**: http://jaeger.gwan.com.br/search
2. **📝 Logs**: http://kibana.gwan.com.br/app/discover  
3. **📈 Métricas**: http://prometheus.gwan.com.br/targets
4. **🚨 Alertas**: http://alertmanager.gwan.com.br/#/alerts

## 📱 **Passo a Passo - Teste Prático**

### **1. Acesse a Aplicação**
```
http://localhost:3001
```

### **2. Abra o Console do Navegador (F12)**
- Vá na aba **Console**
- Você verá logs estruturados em tempo real
- Procure por mensagens como:
  ```
  🔍 OpenTelemetry inicializado para Gwan IA
  📊 Enviando traces para: http://gwan.com.br:4318/v1/traces
  ✅ Instrumentações OpenTelemetry registradas
  ```

### **3. Navegue pelo Site**
- Clique em diferentes páginas
- Faça requisições (se houver API)
- Interaja com elementos da interface

### **4. Verifique os Dados Gerados**

## 🔍 **Jaeger - Traces (Rastreamento)**

### **URL**: http://jaeger.gwan.com.br/search

### **O que você verá:**
- ✅ **Traces de inicialização** da aplicação
- ✅ **Traces de requisições HTTP** (API calls)
- ✅ **Traces de navegação** entre páginas
- ✅ **Traces de interações** do usuário
- ✅ **Performance** de cada operação

### **Como usar:**
1. Acesse o Jaeger
2. Selecione o serviço: `gwan-ia-frontend`
3. Clique em "Find Traces"
4. Veja os traces em tempo real conforme navega

### **Exemplo de Trace:**
```
Trace: app-initialization
├── Span: http-request (GET /api/users)
│   ├── Duration: 150ms
│   ├── Status: 200 OK
│   └── Attributes: {method: GET, url: /api/users}
└── Span: user-interaction (button-click)
    ├── Duration: 5ms
    └── Attributes: {element: login-button}
```

## 📝 **Kibana - Logs Estruturados**

### **URL**: http://kibana.gwan.com.br/app/discover

### **O que você verá:**
- ✅ **Logs de inicialização** da aplicação
- ✅ **Logs de requisições HTTP** com detalhes
- ✅ **Logs de ações do usuário**
- ✅ **Logs de performance**
- ✅ **Logs de erros** (se houver)

### **Como usar:**
1. Acesse o Kibana
2. Vá em "Discover"
3. Selecione o índice: `gwan-ia-frontend-*`
4. Veja logs em tempo real

### **Exemplo de Log:**
```json
{
  "timestamp": "2024-12-19T18:52:00Z",
  "level": "info",
  "message": "HTTP Request",
  "component": "HttpService",
  "action": "GET",
  "url": "/api/users",
  "traceId": "abc123def456",
  "spanId": "def456ghi789",
  "duration": 150,
  "status": 200
}
```

## 📈 **Prometheus - Métricas**

### **URL**: http://prometheus.gwan.com.br/targets

### **O que você verá:**
- ✅ **Métricas de performance** da aplicação
- ✅ **Contadores de requisições**
- ✅ **Tempos de resposta**
- ✅ **Uso de memória**
- ✅ **Web Vitals**

### **Métricas Disponíveis:**
```
# Contadores
http_requests_total{method="GET",status="200"}
http_requests_total{method="POST",status="201"}

# Histogramas
http_request_duration_seconds{method="GET",quantile="0.95"}
http_request_duration_seconds{method="GET",quantile="0.99"}

# Gauges
memory_usage_bytes
cpu_usage_percent
```

## 🚨 **Alertmanager - Alertas**

### **URL**: http://alertmanager.gwan.com.br/#/alerts

### **O que você verá:**
- ✅ **Alertas de performance**
- ✅ **Alertas de erros**
- ✅ **Alertas de disponibilidade**

## 🧪 **Teste Interativo**

### **No Console do Navegador (F12):**

```javascript
// Verificar status da telemetria
getTelemetryStatus()
// Retorna: {enabled: true, provider: "WebTracerProvider", endpoint: "..."}

// Verificar se está funcionando
isTelemetryWorking()
// Retorna: true/false

// Ver trace ID atual
getCurrentTraceId()
// Retorna: "abc123def456"

// Ver span ID atual
getCurrentSpanId()
// Retorna: "def456ghi789"
```

## 📊 **Dados Gerados por Tipo de Ação**

### **🌐 Navegação entre Páginas**
- **Jaeger**: Trace de mudança de rota
- **Kibana**: Log de page view
- **Prometheus**: Contador de page views

### **🔗 Requisições HTTP**
- **Jaeger**: Span de requisição com duração
- **Kibana**: Log detalhado da requisição
- **Prometheus**: Métricas de performance

### **👆 Interações do Usuário**
- **Jaeger**: Span de interação
- **Kibana**: Log de ação do usuário
- **Prometheus**: Contador de interações

### **⚡ Performance**
- **Jaeger**: Spans de performance
- **Kibana**: Logs de Web Vitals
- **Prometheus**: Métricas de performance

## 🔍 **Correlação de Dados**

### **Trace ID**
- Use o mesmo Trace ID para correlacionar dados entre Jaeger e Kibana
- Exemplo: `abc123def456`

### **Span ID**
- Use Span ID para rastrear operações específicas
- Exemplo: `def456ghi789`

### **Timestamp**
- Use timestamp para alinhar dados entre sistemas
- Exemplo: `2024-12-19T18:52:00Z`

## 💡 **Dicas Importantes**

### **1. Dados em Tempo Real**
- **Jaeger**: Atualiza a cada 5-10 segundos
- **Kibana**: Atualiza conforme configurado
- **Prometheus**: Coleta a cada 15 segundos

### **2. Filtros Úteis**
- **Jaeger**: Filtre por serviço e tempo
- **Kibana**: Filtre por nível de log e componente
- **Prometheus**: Filtre por métrica específica

### **3. Debugging**
- Use Trace ID para correlacionar logs e traces
- Use Span ID para rastrear operações específicas
- Use timestamp para alinhar dados entre sistemas

## 🎯 **Resultado Esperado**

Após navegar pelo site, você deve ver:

✅ **Console do navegador**: Logs estruturados em tempo real
✅ **Jaeger**: Traces de navegação e requisições
✅ **Kibana**: Logs detalhados de todas as ações
✅ **Prometheus**: Métricas de performance coletadas

## 🚀 **Próximos Passos**

1. **🌐 Acesse** a aplicação e navegue
2. **🔍 Verifique** o console do navegador
3. **📊 Acesse** Jaeger para ver traces
4. **📝 Acesse** Kibana para ver logs
5. **📈 Acesse** Prometheus para ver métricas

---
*Guia completo para visualização de dados de telemetria*
