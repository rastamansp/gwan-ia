# 🐳 Guia de Deploy no Portainer - Gwan IA

## 🚨 Problema Resolvido: Build Docker

O erro `"/app/dist": not found` foi causado por:
1. **`.dockerignore`** estava ignorando o arquivo `.env.production`
2. **Variáveis de ambiente** não estavam sendo passadas corretamente para o build

## ✅ Correções Implementadas

### **1. Arquivo `.dockerignore` Corrigido**
- ❌ Removido `.env.production` da lista de arquivos ignorados
- ✅ Agora o Docker pode acessar as variáveis de ambiente necessárias

### **2. Dockerfile Melhorado**
- ✅ Adicionadas verificações de build
- ✅ Logs detalhados para debugging
- ✅ Validação do diretório `dist`

### **3. Configuração de Variáveis**
- ✅ Todas as variáveis `VITE_*` configuradas corretamente
- ✅ URLs da API corrigidas

## 📋 Configuração Completa para Portainer

### **Environment Variables**
Configure estas variáveis no Portainer:

```env
# Aplicação
VITE_API_URL=https://api.gwan.com.br/api/v1/
VITE_APP_NAME=Gwan IA
VITE_APP_VERSION=1.1.0
VITE_BUILD_TIME=
VITE_GIT_COMMIT=
VITE_GIT_BRANCH=main
VITE_DEBUG=false
VITE_LOG_LEVEL=info
VITE_SHOW_DEV_TOOLS=false

# Monitoramento APM
VITE_OTEL_EXPORTER_OTLP_ENDPOINT=http://gwan.com.br:4317
VITE_OTEL_SERVICE_NAME=gwan-ia-frontend
VITE_OTEL_SERVICE_VERSION=1.1.0
VITE_OTEL_RESOURCE_ATTRIBUTES=service.name=gwan-ia-frontend,service.version=1.1.0

# Logs
LOG_LEVEL=info
LOG_FORMAT=json
```

## 🔧 Passos para Deploy

### **1. Configurar Variáveis**
1. Acesse o Portainer
2. Vá para **Stacks**
3. Edite a stack `gwan-ia`
4. Na seção **Environment variables**
5. Adicione todas as variáveis acima

### **2. Fazer Deploy**
1. **Salve** as configurações
2. **Faça o deploy** da stack
3. **Aguarde** o build completar
4. **Verifique os logs** para confirmar sucesso

### **3. Verificar Deploy**
- ✅ Container deve estar rodando
- ✅ Logs devem mostrar "Build completed successfully"
- ✅ Aplicação deve estar acessível em `https://gwan.com.br`

## 🐛 Troubleshooting

### **Se o build ainda falhar:**

1. **Verifique os logs do build:**
   ```bash
   # No Portainer, vá para Containers
   # Clique no container gwan-site
   # Verifique os logs de build
   ```

2. **Verifique se todas as variáveis estão configuradas:**
   - Todas as variáveis `VITE_*` devem estar presentes
   - Não deve haver espaços extras nos nomes
   - Valores devem estar corretos

3. **Force rebuild completo:**
   - No Portainer, vá para **Images**
   - Delete a imagem `gwan-site`
   - Faça novo deploy da stack

### **Logs Esperados no Build:**
```
Build completed successfully
Dist directory contents:
/app/dist/index.html
/app/dist/assets/index-xxx.js
/app/dist/assets/index-xxx.css
```

## 📞 Suporte

Se o problema persistir:
1. Verifique os logs completos do build
2. Confirme que todas as variáveis estão configuradas
3. Teste com rebuild completo
4. Verifique se o Docker tem recursos suficientes

## 🎯 Resultado Esperado

Após o deploy bem-sucedido:
- ✅ Aplicação funcionando em `https://gwan.com.br`
- ✅ Chamadas da API para `https://api.gwan.com.br/api/v1/`
- ✅ Monitoramento APM ativo
- ✅ Logs estruturados funcionando
- ✅ Health check respondendo em `/health`
