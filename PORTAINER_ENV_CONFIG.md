# 🐳 Configuração de Variáveis de Ambiente para Portainer

## 📋 Variáveis Obrigatórias para Produção

Configure as seguintes variáveis no Portainer em **Environment variables**:

### **Aplicação**
```
VITE_API_URL=https://api.gwan.com.br
VITE_APP_NAME=Gwan IA
VITE_APP_VERSION=1.1.0
VITE_BUILD_TIME=
VITE_GIT_COMMIT=
VITE_GIT_BRANCH=main
VITE_DEBUG=false
VITE_LOG_LEVEL=info
VITE_SHOW_DEV_TOOLS=false
```

### **Monitoramento APM (com prefixo VITE_)**
```
VITE_OTEL_EXPORTER_OTLP_ENDPOINT=http://gwan.com.br:4317
VITE_OTEL_SERVICE_NAME=gwan-ia-frontend
VITE_OTEL_SERVICE_VERSION=1.1.0
VITE_OTEL_RESOURCE_ATTRIBUTES=service.name=gwan-ia-frontend,service.version=1.1.0
```

### **Logs**
```
LOG_LEVEL=info
LOG_FORMAT=json
```

## 🔧 Como Configurar no Portainer

1. **Acesse o Portainer**
2. **Vá para Stacks**
3. **Edite a stack `gwan-ia`**
4. **Na seção "Environment variables"**
5. **Adicione todas as variáveis acima**
6. **Salve e faça o deploy**

## ⚠️ Importante

- **TODAS** as variáveis `VITE_*` são obrigatórias
- As variáveis de monitoramento **DEVEM** ter o prefixo `VITE_`
- Após configurar, faça um **rebuild** da stack
- Verifique os logs para confirmar que não há erros

## 🚨 Erro Comum

Se aparecer erro de "variável não definida", verifique se:
- ✅ Todas as variáveis `VITE_*` estão configuradas
- ✅ Não há espaços extras nos nomes das variáveis
- ✅ Os valores estão corretos (sem aspas extras)
- ✅ A stack foi rebuildada após as alterações

## 📞 Suporte

Se o problema persistir, verifique:
1. Logs do container
2. Variáveis de ambiente no Portainer
3. Configuração da stack
4. Rebuild completo da aplicação
