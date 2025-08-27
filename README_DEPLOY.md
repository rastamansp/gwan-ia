# 🚀 Deploy Gwan IA

## 📋 Pré-requisitos

- Portainer rodando
- Rede Docker `gwan` criada
- Traefik configurado com HTTPS e domínio `gwan.com.br`

## 🔧 Deploy Rápido

### 1. Criar Rede (se não existir)
```bash
docker network create gwan
```

### 2. Configurar Variáveis de Ambiente
```bash
# Configure as variáveis sensíveis no sistema:
export SMTP_USER="seu-email@gmail.com"
export SMTP_PASSWORD="sua-senha-app"
export ADMIN_PASSWORD="senha-admin-segura"
export CHATWOOT_KEY="sua-chave-chatwoot"

# Ou crie um arquivo .env no servidor
cp env.example .env
# Edite o arquivo .env com suas configurações
```

### 3. Build da Imagem
```bash
docker build -t gwan-site:latest .
```

### 4. Deploy no Portainer

1. **Acesse o Portainer**
2. **Vá para Stacks → Add stack**
3. **Configure:**
   - **Name:** `gwan-site`
   - **Build method:** `Web editor`
4. **Cole o conteúdo do arquivo `docker-compose.yml`**
5. **Clique em "Deploy the stack"**

## 📁 Arquivos Necessários

- `docker-compose.yml` - Configuração principal
- `Dockerfile` - Build da aplicação
- `nginx.conf` - Configuração Nginx
- `.dockerignore` - Arquivos ignorados

## 🌐 Acesso

- **URL:** https://gwan.com.br
- **Health Check:** https://gwan.com.br/health

## 📚 Documentação Completa

Veja `PORTAINER_DEPLOY.md` para instruções detalhadas.

## ✅ Status Atual

### **Build Docker:**
- ✅ **Status:** Funcionando perfeitamente
- ✅ **Imagem:** `gwan-site:latest` (80.8MB)
- ✅ **Tempo de build:** ~14 segundos

### **Correções Implementadas:**
- ✅ **TypeScript:** Todos os erros de lint corrigidos
- ✅ **Imports:** Imports não utilizados removidos
- ✅ **Tipos:** Conflitos de tipos resolvidos
- ✅ **Props:** Props incorretas corrigidas
- ✅ **Rede:** Configuração atualizada para rede `gwan`

### **Funcionalidades:**
- ✅ **Autenticação:** Sistema OTP completo
- ✅ **Chatbots:** Jaiminho, Marley e Gwan funcionando
- ✅ **Layout:** AppLayout responsivo com sidebar
- ✅ **Temas:** Sistema de temas dinâmico
- ✅ **PWA:** Configuração para Progressive Web App

### **Deploy:**
- ✅ **Docker:** Multi-stage build otimizado
- ✅ **Nginx:** Configuração de produção
- ✅ **Traefik:** Labels configurados para `gwan.com.br`
- ✅ **Portainer:** Configuração completa para stack deployment
