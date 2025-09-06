# 🚨 Troubleshooting - Deploy Portainer

## 📊 Análise dos Logs Fornecidos

### ✅ **O que está funcionando:**
- Container está rodando (`nginx -g daemon off;`)
- Nginx está iniciando corretamente
- Configuração do Traefik está presente
- Health check está configurado

### ❌ **Problemas identificados:**

#### 1. **API URL Incorreta**
```
VITE_API_URL: https://bff.gwan.com.br/api
```
**Problema:** Deveria ser `https://api.gwan.com.br/api`

#### 2. **Variáveis de Build Incorretas**
```
VITE_GIT_COMMIT: 1.0.0  # ❌ Deveria ser o hash do commit
VITE_BUILD_TIME: 2024-12-19T10:00:00Z  # ❌ Data fixa
```

#### 3. **Possível Problema de Build**
O container está rodando, mas pode não ter os arquivos corretos.

## 🔧 **Soluções Imediatas**

### **Solução 1: Corrigir Variáveis de Ambiente**

No Portainer, vá para a stack `gwan-site` e adicione/edite estas variáveis:

```yaml
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://api.gwan.com.br/api  # ✅ Corrigido
  - VITE_APP_NAME=Gwan IA
  - VITE_APP_VERSION=1.0.0
  - VITE_BUILD_TIME=  # ✅ Deixar vazio para auto-gerar
  - VITE_GIT_COMMIT=  # ✅ Deixar vazio para auto-gerar
  - VITE_GIT_BRANCH=main
```

### **Solução 2: Verificar se os Arquivos Estão no Container**

Execute estes comandos no Portainer (Terminal do container):

```bash
# Verificar se os arquivos foram copiados
ls -la /usr/share/nginx/html/

# Verificar se o index.html existe
cat /usr/share/nginx/html/index.html

# Verificar se os assets existem
ls -la /usr/share/nginx/html/assets/

# Testar o nginx
nginx -t
```

### **Solução 3: Verificar Logs do Build**

No Portainer, vá para:
1. **Stacks** → **gwan-site**
2. **Logs** → Verificar se houve erros no build

### **Solução 4: Forçar Rebuild**

1. **No Portainer:**
   - Vá para a stack `gwan-site`
   - Clique em **"Update the stack"**
   - Marque **"Recreate containers"**
   - Clique em **"Update the stack"**

## 🔍 **Diagnóstico Detalhado**

### **Passo 1: Verificar Health Check**
```bash
# No terminal do container
wget --quiet --tries=1 --spider http://localhost/health
echo $?  # Deve retornar 0
```

### **Passo 2: Verificar Arquivos**
```bash
# Verificar estrutura de arquivos
find /usr/share/nginx/html -type f -name "*.html" -o -name "*.js" -o -name "*.css"
```

### **Passo 3: Verificar Nginx**
```bash
# Testar configuração
nginx -t

# Verificar processos
ps aux | grep nginx

# Verificar logs de erro
tail -f /var/log/nginx/error.log
```

### **Passo 4: Testar Conectividade**
```bash
# Testar localmente no container
curl -I http://localhost/

# Verificar se está escutando na porta 80
netstat -tlnp | grep :80
```

## 🚀 **Solução Rápida (Recomendada)**

### **Opção 1: Update Stack com Variáveis Corretas**

1. **Copie este docker-compose.yml corrigido:**

```yaml
version: '3.8'

services:
  gwan-site:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VITE_API_URL: ${VITE_API_URL:-https://api.gwan.com.br/api}
        VITE_APP_NAME: ${VITE_APP_NAME:-Gwan IA}
        VITE_APP_VERSION: ${VITE_APP_VERSION:-1.0.0}
        VITE_BUILD_TIME: ${VITE_BUILD_TIME:-}
        VITE_GIT_COMMIT: ${VITE_GIT_COMMIT:-}
        VITE_GIT_BRANCH: ${VITE_GIT_BRANCH:-main}
    container_name: gwan-site
    restart: unless-stopped
    networks:
      - gwan
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.gwan-site.rule=Host(`gwan.com.br`)"
      - "traefik.http.routers.gwan-site.entrypoints=websecure"
      - "traefik.http.routers.gwan-site.tls.certresolver=letsencrypt"
      - "traefik.http.services.gwan-site.loadbalancer.server.port=80"
      - "traefik.docker.network=gwan"
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    environment:
      - NODE_ENV=production
      - VITE_API_URL=https://api.gwan.com.br/api
      - VITE_APP_NAME=Gwan IA
      - VITE_APP_VERSION=1.0.0
      - VITE_BUILD_TIME=
      - VITE_GIT_COMMIT=
      - VITE_GIT_BRANCH=main
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
        window: 120s

networks:
  gwan:
    external: true
```

2. **No Portainer:**
   - Vá para a stack `gwan-site`
   - Clique em **"Update the stack"**
   - Cole o conteúdo acima
   - Marque **"Recreate containers"**
   - Clique em **"Update the stack"**

### **Opção 2: Verificar Rede Traefik**

```bash
# Verificar se a rede gwan existe
docker network ls | grep gwan

# Se não existir, criar:
docker network create gwan
```

## 📋 **Checklist de Verificação**

- [ ] Container está rodando
- [ ] Arquivos estão em `/usr/share/nginx/html/`
- [ ] `index.html` existe e tem conteúdo
- [ ] Assets (JS/CSS) existem
- [ ] Nginx está funcionando (`nginx -t`)
- [ ] Health check responde (`/health`)
- [ ] Rede `gwan` existe
- [ ] Traefik está configurado
- [ ] Variáveis de ambiente estão corretas

## 🆘 **Se Nada Funcionar**

### **Reset Completo:**

1. **Parar a stack:**
   ```bash
   docker-compose down
   ```

2. **Remover imagem:**
   ```bash
   docker rmi gwan-site:latest
   ```

3. **Recriar no Portainer** com o docker-compose.yml corrigido

## 📞 **Próximos Passos**

1. **Execute a Solução Rápida (Opção 1)**
2. **Aguarde 5-10 minutos** para o build
3. **Teste:** `https://gwan.com.br`
4. **Se não funcionar, execute os comandos de diagnóstico**

---

**💡 Dica:** O problema mais provável é a API URL incorreta (`bff.gwan.com.br` em vez de `api.gwan.com.br`) e as variáveis de build fixas.
