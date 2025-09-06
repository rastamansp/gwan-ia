# 🐳 Docker - Gwan IA

## 📁 Arquivos Docker

- **`docker-compose.yml`** - Deploy de **produção** (Portainer)
- **`docker-compose.local.yml`** - Deploy **local** (desenvolvimento)
- **`Dockerfile`** - Build da aplicação
- **`nginx.conf`** - Configuração Nginx

## 🚀 Deploy de Produção (Portainer)

### Configuração Automática

O Portainer usa o arquivo `docker-compose.yml` que:
- ✅ **Faz build automático** da aplicação
- ✅ **Configura Traefik** para `gwan.com.br`
- ✅ **Usa rede externa** `gwan`
- ✅ **Configura recursos** (CPU/Memory limits)
- ✅ **Health checks** automáticos

### Como Deployar

1. **Acesse o Portainer**
2. **Vá para Stacks**
3. **Clique em "Add stack"**
4. **Configure:**
   - **Name:** `gwan-site`
   - **Build method:** `Web editor`
   - **Cole o conteúdo do `docker-compose.yml`**

### Atualizações

1. **No Portainer:**
   - Vá para a stack `gwan-site`
   - Clique em "Update the stack"
   - O build será refeito automaticamente

## 🏠 Desenvolvimento Local

### Usar Docker Localmente

```bash
# Executar com arquivo local
docker-compose -f docker-compose.local.yml up -d

# Acessar em http://localhost:8080
```

### Diferenças do Local

- **Container name:** `gwan-site-local` (não conflita com produção)
- **Porta:** `8080:80` (acesso direto)
- **API URL:** `http://localhost:3000/api` (desenvolvimento)
- **NODE_ENV:** `development`
- **Sem Traefik** (não precisa de rede externa)

## 🔧 Configurações

### Variáveis de Ambiente

#### **Produção (`docker-compose.yml`)**
```yaml
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://api.gwan.com.br/api
  - VITE_APP_NAME=Gwan IA
  - VITE_APP_VERSION=1.0.0
```

#### **Local (`docker-compose.local.yml`)**
```yaml
environment:
  - NODE_ENV=development
  - VITE_API_URL=http://localhost:3000/api
  - VITE_APP_NAME=Gwan IA
  - VITE_APP_VERSION=1.0.0
```

### Recursos (Produção)

```yaml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
    reservations:
      memory: 256M
      cpus: '0.25'
```

### Health Check

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## 🏷️ Labels Traefik (Produção)

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.gwan-site.rule=Host(`gwan.com.br`)"
  - "traefik.http.routers.gwan-site.entrypoints=websecure"
  - "traefik.http.routers.gwan-site.tls.certresolver=letsencrypt"
  - "traefik.http.services.gwan-site.loadbalancer.server.port=80"
  - "traefik.docker.network=gwan"
```

## 🚨 Troubleshooting

### Problema: Site não carrega

1. **Verificar se a rede `gwan` existe:**
   ```bash
   docker network ls | grep gwan
   ```

2. **Se não existir, criar:**
   ```bash
   docker network create gwan
   ```

### Problema: Build falha

1. **Verificar se o código está atualizado:**
   ```bash
   git pull origin main
   ```

2. **Fazer build manual:**
   ```bash
   docker build -t gwan-site:latest .
   ```

### Problema: Container não inicia

1. **Verificar logs:**
   ```bash
   docker logs gwan-site
   ```

2. **Verificar recursos do sistema:**
   ```bash
   docker stats
   ```

## 📊 Monitoramento

### Logs

```bash
# Logs em tempo real
docker logs gwan-site -f

# Últimas 100 linhas
docker logs gwan-site --tail 100
```

### Status

```bash
# Status dos containers
docker ps -a | grep gwan-site

# Status das redes
docker network ls | grep gwan

# Status das imagens
docker images | grep gwan-site
```

### Recursos

```bash
# Uso de recursos
docker stats gwan-site

# Informações detalhadas
docker inspect gwan-site
```

## 🔄 Comandos Úteis

### Limpeza

```bash
# Parar e remover container
docker stop gwan-site && docker rm gwan-site

# Remover imagem
docker rmi gwan-site:latest

# Limpeza completa
docker system prune -a
```

### Debug

```bash
# Entrar no container
docker exec -it gwan-site sh

# Verificar arquivos
docker exec gwan-site ls -la /usr/share/nginx/html

# Testar conectividade
docker exec gwan-site wget -O- http://localhost/health
```

## ✅ Checklist de Deploy

### Produção
- [ ] Código atualizado no repositório
- [ ] Rede `gwan` existe
- [ ] Stack configurada no Portainer
- [ ] Build executado com sucesso
- [ ] Container rodando
- [ ] Health check passando
- [ ] Site acessível em `https://gwan.com.br`

### Local
- [ ] Código atualizado localmente
- [ ] Docker rodando
- [ ] Container local rodando
- [ ] Site acessível em `http://localhost:8080`
