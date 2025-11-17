# 🚀 Gwan IA - Plataforma de Inteligência Artificial

**Versão:** 1.1.0  
**Status:** ✅ Produção - Funcionalidades Core Implementadas

## 📋 Requisitos

### **Node.js e npm**
- **Node.js:** 20.x (mesma versão usada no Docker)
- **npm:** >= 9.0.0

### **Configurar a versão do Node localmente:**

#### **Usando NVM (Node Version Manager):**
```bash
# Instalar Node 20 (se ainda não tiver)
nvm install 20

# Usar Node 20 no projeto
nvm use 20

# O arquivo .nvmrc será lido automaticamente
nvm use
```

#### **Usando Volta:**
```bash
# Instalar Volta (se ainda não tiver)
# https://volta.sh/

# O arquivo .node-version será lido automaticamente
volta install node@20
```

#### **Verificar versão:**
```bash
node --version  # Deve retornar v20.x.x
npm --version   # Deve retornar >= 9.0.0
```

> **Nota:** A versão do Node no Docker (`node:20-alpine`) deve corresponder à versão local para evitar problemas de compatibilidade durante o desenvolvimento.

## 📋 Status do Projeto

### ✅ **Funcionalidades Implementadas**

#### **🏠 Página Inicial (HomePage)**
- Design responsivo com tema personalizado
- Seção "Experimente" com cards dos chatbots
- Navegação unificada com Header compartilhado
- Links para Login e Inscreva-se
- Alertas para funcionalidades em desenvolvimento

#### **🤖 Chatbots Especializados**
- **Jaiminho** - Naturopata (🌿)
- **Marley** - Músico (🎵) 
- **Gwan** - Institucional (🏢)
- Páginas dedicadas com design consistente
- Headers compartilhados e navegação uniforme

#### **🔐 Sistema de Autenticação**
- Login com OTP via email
- Registro de conta com ativação
- Verificação de código OTP
- Contexto de autenticação global
- Rotas protegidas

#### **🛒 Gwan Mart - E-commerce Completo**
- **Loja online** com produtos tecnológicos premium
- **Página de produtos** com galeria de imagens
- **URLs amigáveis** para produtos (usando códigos em vez de IDs)
- **Páginas de detalhes** dinâmicas por produto
- **Integração WhatsApp** para compras
- **Seleção de opções** obrigatória (cores, armazenamento)
- **Controles de quantidade** e origem do frete
- **Campo CEP** opcional para cálculo de frete
- **Mensagens formatadas** com dados completos do produto
- **Navegação unificada** em todas as páginas
- **Compatibilidade total** com URLs antigas (IDs numéricos)

#### **📱 Integração WhatsApp**
- **Botões de compra** integrados ao WhatsApp
- **Mensagens formatadas** com dados do produto
- **Número internacional** configurado (5511987221050)
- **Dados incluídos**: ID, nome, opção, quantidade, origem, CEP, preço
- **Validação obrigatória** de seleção de opções
- **Formatação automática** de CEP (00000-000)
- **Links diretos** para WhatsApp Web/App

#### **🎨 Design System**
- Tema personalizado com Tailwind CSS
- Tokens de cores semânticas
- Componentes reutilizáveis
- Sistema de tipografia e espaçamento
- Suporte a temas claro/escuro

#### **🏗️ Arquitetura e Qualidade**
- Clean Architecture implementada
- Componentes modulares e reutilizáveis
- Context API para gerenciamento de estado
- Hooks customizados
- TypeScript com configuração estrita
- **Validação automática de ambiente** antes da inicialização
- **Sistema de logs estruturados** com telemetria
- **Monitoramento APM** configurado (Jaeger, Kibana, Prometheus)

#### **🐳 Docker & Deploy**
- Configuração para produção
- Nginx otimizado para SPA
- Labels Traefik para gwan.com.br
- Health checks e monitoramento
- Configuração Portainer

### 🚧 **Funcionalidades em Desenvolvimento**
- Dashboard administrativo
- Gerenciamento de usuários
- Sistema de notificações
- Analytics e métricas
- PWA (Progressive Web App)

### 📱 **Páginas Implementadas**
- `/` - HomePage
- `/auth` - Login
- `/register-account` - Registro
- `/verify-account` - Verificação de conta
- `/bot-jaiminho` - Chatbot Jaiminho
- `/bot-marley` - Chatbot Marley  
- `/bot-gwan` - Chatbot Gwan
- `/bot-gwan-mart` - Chatbot Gwan Mart (Atendente E-commerce)
- `/gwan-mart` - Loja online Gwan Mart
- `/gwan-mart/product/:productCode` - Página de detalhes do produto (URLs amigáveis)
- `/dashboard` - Dashboard (estrutura básica)
- `/debug` - Validação de variáveis de ambiente

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **State**: React Context + Hooks
- **Routing**: React Router DOM
- **Deploy**: Docker + Nginx + Traefik

## 🚀 Como Executar

```bash
# Instalar dependências
pnpm install

# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Preview
pnpm preview

# Validação completa (lint + type-check + build)
pnpm validate
```

## 🧪 **Validação e Qualidade**

### **Hook de Validação Automática**
O projeto utiliza **Husky** para garantir qualidade de código antes de cada commit:

- **✅ Pre-commit Hook** - Validação automática antes do commit
- **✅ ESLint** - Verificação de padrões de código
- **✅ TypeScript Check** - Validação de tipos
- **✅ Build Validation** - Teste de build antes do commit

#### **Scripts de Validação:**
```bash
# Lint com ESLint
pnpm lint

# Correção automática de lint
pnpm lint:fix

# Verificação de tipos TypeScript
pnpm type-check

# Validação completa
pnpm validate
```

#### **Configuração Automática:**
- **Husky** executa validações automaticamente
- **lint-staged** formata apenas arquivos modificados
- **Prettier** mantém formatação consistente
- **Commit bloqueado** se houver erros críticos

## 🐳 Docker

```bash
# Build e execução local
docker-compose up -d

# Acesso local
http://localhost:8080
```

## 🚀 Deploy em Produção (Portainer)

### **Configuração no Portainer:**

1. **Adicionar Stack:**
   - **Repository URL:** `https://github.com/rastamansp/gwan-ia.git`
   - **Reference:** `main`
   - **Compose path:** `docker-compose-production.yml`

2. **Variáveis de Ambiente:**
   ```env
   NODE_ENV=production
   VITE_APP_NAME=Gwan IA
   VITE_APP_VERSION=1.1.0
   VITE_API_URL=https://api.gwan.com.br/api
   VITE_BUILD_TIME=
   VITE_GIT_COMMIT=
   VITE_GIT_BRANCH=main
   VITE_DEBUG=false
   VITE_LOG_LEVEL=info
   VITE_SHOW_DEV_TOOLS=false
   
   # Monitoramento APM
   OTEL_EXPORTER_OTLP_ENDPOINT=http://gwan.com.br:4317
   OTEL_SERVICE_NAME=gwan-ia-frontend
   OTEL_SERVICE_VERSION=1.1.0
   OTEL_RESOURCE_ATTRIBUTES=service.name=gwan-ia-frontend,service.version=1.1.0
   
   # Logs
   LOG_LEVEL=info
   LOG_FORMAT=json
   ```

3. **Deploy Automático:**
   - Build automático via Git
   - Traefik configurado para `gwan.com.br`
   - SSL automático via Let's Encrypt

### **Arquivos de Deploy:**
- **`docker-compose.yml`** - Desenvolvimento local
- **`docker-compose-production.yml`** - Produção (Portainer)
- **`env.production`** - Variáveis de ambiente de produção
- **`MONITORING.md`** - Configuração de monitoramento APM

## 📝 Licença

MIT License
