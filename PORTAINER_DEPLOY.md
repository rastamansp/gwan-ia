# 🚀 Deploy via Portainer - Gwan IA

Este documento explica como fazer o deploy da aplicação Gwan IA usando Portainer.

## 📋 Pré-requisitos

- Portainer rodando e acessível
- Rede Docker `gwan` criada
- Traefik configurado com:
  - Entrypoint `websecure` (HTTPS)
  - Cert resolver `letsencrypt`
  - Domínio `gwan.com.br`

## 🔧 Preparação

### 1. Criar Rede Gwan

```bash
docker network create gwan
```

### 2. Build da Imagem

Antes de fazer o deploy no Portainer, você precisa fazer o build da imagem:

```bash
# No servidor onde está o código
docker build -t gwan-site:latest .
```

**OU** usar o docker-compose para build:

```bash
docker-compose build
```

## 🎯 Deploy no Portainer

### Deploy de Produção (Recomendado)

1. **Acesse o Portainer**
2. **Vá para Stacks**
3. **Clique em "Add stack"**
4. **Configure:**
   - **Name:** `gwan-site`
   - **Build method:** `Web editor`
   - **Copy and paste o conteúdo do arquivo `docker-compose.yml`**

### Deploy Local (Desenvolvimento)

Para desenvolvimento local, use o arquivo `docker-compose.local.yml`:

```bash
# Executar localmente
docker-compose -f docker-compose.local.yml up -d

# Acessar em http://localhost:8080
```

## 📁 Estrutura de Arquivos

```
├── docker-compose.yml           # Deploy de produção (Portainer)
├── docker-compose.local.yml     # Deploy local (desenvolvimento)
├── Dockerfile                   # Build da aplicação
├── nginx.conf                   # Configuração Nginx
├── .dockerignore                # Arquivos ignorados
└── PORTAINER_DEPLOY.md          # Este arquivo
```

## 🔄 Workflow de Deploy

### Deploy de Produção (Portainer)

1. **O Portainer fará o build automaticamente** usando o `docker-compose.yml`
2. **Deploy no Portainer:**
   - Vá para Stacks
   - Add stack com conteúdo do `docker-compose.yml`
   - O build será feito automaticamente

### Atualizações (Re-deploy)

1. **No Portainer:**
   - Vá para a stack `gwan-site`
   - Clique em "Update the stack"
   - O build será refeito automaticamente com o novo código

### Desenvolvimento Local

```bash
# Usar arquivo local para desenvolvimento
docker-compose -f docker-compose.local.yml up -d

# Acessar em http://localhost:8080
```

## ⚙️ Configurações Portainer

### Variáveis de Ambiente

#### **Variáveis Obrigatórias:**
- `NODE_ENV=production`
- `VITE_APP_NAME=Gwan IA`
- `VITE_APP_VERSION=1.0.0`
- `VITE_API_URL=https://api.gwan.com.br/api`

#### **Variáveis de Email (SMTP):**
- `VITE_SMTP_HOST=smtp.gmail.com`
- `VITE_SMTP_PORT=587`
- `VITE_SMTP_SECURE=false`
- `VITE_SMTP_USER=${SMTP_USER:-}` (configurar no sistema)
- `VITE_SMTP_PASSWORD=${SMTP_PASSWORD:-}` (configurar no sistema)
- `VITE_SMTP_FROM_NAME=GWAN`
- `VITE_SMTP_FROM_EMAIL=noreply@gwan.com.br`

#### **Variáveis de Admin:**
- `VITE_ADMIN_EMAIL=${ADMIN_EMAIL:-admin@gwan.com.br}`
- `VITE_ADMIN_PASSWORD=${ADMIN_PASSWORD:-}` (configurar no sistema)
- `VITE_ADMIN_NAME=Administrador Gwan`

#### **Variáveis Opcionais:**
- `VITE_CHATWOOT_KEY=${CHATWOOT_KEY:-}`
- `VITE_BUILD_TIME=${BUILD_TIME:-}`
- `VITE_GIT_COMMIT=${GIT_COMMIT:-}`
- `VITE_GIT_BRANCH=${GIT_BRANCH:-}`

#### **Configuração no Sistema:**
```bash
# No servidor, configure as variáveis sensíveis:
export SMTP_USER="seu-email@gmail.com"
export SMTP_PASSWORD="sua-senha-app"
export ADMIN_PASSWORD="senha-admin-segura"
export CHATWOOT_KEY="sua-chave-chatwoot"

# Ou crie um arquivo .env no servidor:
echo "SMTP_USER=seu-email@gmail.com" >> .env
echo "SMTP_PASSWORD=sua-senha-app" >> .env
echo "ADMIN_PASSWORD=senha-admin-segura" >> .env
echo "CHATWOOT_KEY=sua-chave-chatwoot" >> .env
```

### Recursos

- **Memory Limit:** 512M
- **CPU Limit:** 0.5 cores
- **Memory Reservation:** 256M
- **CPU Reservation:** 0.25 cores

### Health Check

- **Endpoint:** `/health`
- **Interval:** 30s
- **Timeout:** 10s
- **Retries:** 3
- **Start Period:** 40s

## 🏷️ Labels Traefik

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.gwan-site.rule=Host(`gwan.com.br`)"
  - "traefik.http.routers.gwan-site.entrypoints=websecure"
  - "traefik.http.routers.gwan-site.tls.certresolver=letsencrypt"
  - "traefik.http.services.gwan-site.loadbalancer.server.port=80"
  - "traefik.docker.network=gwan"
```

## 📊 Monitoramento

### Logs

- **Portainer:** Stacks → gwan-site → Logs
- **Comando:** `docker logs gwan-site -f`

### Status

- **Portainer:** Stacks → gwan-site → Containers
- **Health Check:** Verificar status do container

### Métricas

- **Portainer:** Containers → gwan-site → Stats
- **Recursos:** CPU, Memory, Network, Disk

## 🚨 Troubleshooting

### Container não inicia

1. **Verificar logs no Portainer**
2. **Verificar se a rede `gwan` existe**
3. **Verificar se a porta 80 está livre**
4. **Verificar recursos do sistema**

### Problemas de rede

1. **Verificar se a rede Gwan está configurada**
2. **Verificar conectividade entre containers**
3. **Verificar configuração do Traefik**

### Problemas de build

1. **Verificar se o Dockerfile está correto**
2. **Verificar se as dependências estão instaladas**
3. **Verificar espaço em disco**

## 🔄 Atualizações

### Atualizar Código

1. **Faça as alterações no código**
2. **Commit e push para o repositório**
3. **No servidor:**
   ```bash
   git pull origin main
   docker build -t gwan-site:latest .
   ```
4. **No Portainer:** Update the stack

### Rollback

1. **No Portainer:** Vá para a stack
2. **Clique em "Redeploy"**
3. **Selecione a versão anterior da imagem**

## 📚 Recursos Adicionais

- [Portainer Documentation](https://docs.portainer.io/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Traefik Documentation](https://doc.traefik.io/traefik/)

## 🆘 Suporte

Para problemas específicos:

1. **Verifique os logs no Portainer**
2. **Verifique o status da stack**
3. **Verifique a conectividade de rede**
4. **Consulte a documentação oficial**
5. **Abra uma issue no repositório**

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
