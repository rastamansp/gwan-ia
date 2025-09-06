# 🚨 Troubleshooting - Portainer + Traefik

## 📊 **Análise Corrigida (Traefik)**

### ✅ **O que está funcionando:**
- Container está rodando
- Nginx está funcionando internamente
- Labels Traefik estão configurados
- Health check está configurado

### ❌ **Problemas identificados:**

#### 1. **API URL Incorreta**
```
VITE_API_URL: https://bff.gwan.com.br/api  # ❌ ERRADO
```
**Deveria ser:** `https://api.gwan.com.br/api`

#### 2. **Possível Problema de Build**
O container pode estar rodando, mas sem os arquivos corretos.

#### 3. **Configuração Traefik**
Verificar se o Traefik está roteando corretamente.

## 🔍 **Diagnóstico Específico para Traefik**

### **Passo 1: Verificar se o Container Está Funcionando**

No Portainer, vá para o container `gwan-site` e execute:

```bash
# Verificar se os arquivos estão lá
ls -la /usr/share/nginx/html/

# Verificar se o index.html existe
cat /usr/share/nginx/html/index.html

# Verificar se os assets existem
ls -la /usr/share/nginx/html/assets/

# Testar o nginx interno
nginx -t
```

### **Passo 2: Verificar Health Check**

```bash
# Testar health check interno
wget --quiet --tries=1 --spider http://localhost/health
echo $?  # Deve retornar 0

# Verificar se está respondendo
curl -I http://localhost/
```

### **Passo 3: Verificar Traefik**

No Portainer, vá para **Networks** e verifique:

1. **Rede `gwan` existe?**
2. **Traefik está conectado à rede `gwan`?**
3. **Container está conectado à rede `gwan`?**

### **Passo 4: Verificar Logs do Traefik**

No Portainer:
1. Vá para **Containers**
2. Encontre o container do Traefik
3. Clique em **Logs**
4. Procure por erros relacionados ao `gwan.com.br`

## 🔧 **Soluções Imediatas**

### **Solução 1: Corrigir Variáveis de Ambiente**

No Portainer, vá para a stack `gwan-site` e edite as variáveis:

```yaml
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://api.gwan.com.br/api  # ✅ CORRIGIDO
  - VITE_APP_NAME=Gwan IA
  - VITE_APP_VERSION=1.0.0
  - VITE_BUILD_TIME=  # Deixar vazio
  - VITE_GIT_COMMIT=  # Deixar vazio
  - VITE_GIT_BRANCH=main
```

### **Solução 2: Verificar Rede Traefik**

```bash
# Verificar se a rede gwan existe
docker network ls | grep gwan

# Se não existir, criar:
docker network create gwan

# Verificar se o Traefik está na rede
docker network inspect gwan
```

### **Solução 3: Forçar Rebuild**

1. **No Portainer:**
   - Vá para a stack `gwan-site`
   - Clique em **"Update the stack"**
   - Marque **"Recreate containers"**
   - Clique em **"Update the stack"**

### **Solução 4: Verificar DNS**

```bash
# No servidor, testar DNS
nslookup gwan.com.br

# Testar conectividade
curl -I https://gwan.com.br
```

## 🚀 **Solução Rápida (Recomendada)**

### **Opção 1: Update Stack Completo**

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

### **Opção 2: Verificar Traefik Dashboard**

1. **Acesse o Traefik Dashboard** (geralmente em `http://seu-servidor:8080`)
2. **Verifique se o serviço `gwan-site` aparece**
3. **Verifique se há erros de certificado SSL**

## 🔍 **Comandos de Diagnóstico**

### **Verificar Container:**
```bash
# Status do container
docker ps | grep gwan-site

# Logs do container
docker logs gwan-site

# Entrar no container
docker exec -it gwan-site sh
```

### **Verificar Traefik:**
```bash
# Logs do Traefik
docker logs traefik

# Verificar configuração
docker exec traefik cat /etc/traefik/traefik.yml
```

### **Verificar Rede:**
```bash
# Inspectar rede
docker network inspect gwan

# Verificar conectividade
docker exec gwan-site ping traefik
```

## 📋 **Checklist Traefik**

- [ ] Container `gwan-site` está rodando
- [ ] Arquivos estão em `/usr/share/nginx/html/`
- [ ] Health check responde (`/health`)
- [ ] Rede `gwan` existe
- [ ] Traefik está na rede `gwan`
- [ ] Container está na rede `gwan`
- [ ] Labels Traefik estão corretos
- [ ] Certificado SSL está funcionando
- [ ] DNS `gwan.com.br` aponta para o servidor
- [ ] Porta 443 está aberta no firewall

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

3. **Verificar rede:**
   ```bash
   docker network inspect gwan
   ```

4. **Recriar no Portainer** com o docker-compose.yml corrigido

## 📞 **Próximos Passos**

1. **Execute a Solução Rápida (Opção 1)**
2. **Aguarde 5-10 minutos** para o build
3. **Teste:** `https://gwan.com.br`
4. **Se não funcionar, execute os comandos de diagnóstico**
5. **Verifique o Traefik Dashboard**

---

**💡 Dica:** O problema mais provável é a API URL incorreta (`bff.gwan.com.br` em vez de `api.gwan.com.br`) e possíveis problemas de rede Traefik.
