# 🚀 Gwan IA - Plataforma de Inteligência Artificial

## 📋 Visão Geral

Gwan IA é uma plataforma moderna de inteligência artificial desenvolvida com React, TypeScript e Tailwind CSS. A aplicação oferece ferramentas de IA, chatbots inteligentes e um sistema de autenticação OTP robusto.

## ✨ Funcionalidades Principais

### 🤖 **Chatbots Inteligentes**
- **Bot Jaiminho**: Assistente especializado em sustentabilidade
- **Bot Marley**: Assistente de bem-estar e felicidade
- **Bot Gwan**: Assistente corporativo empresarial

### 🔐 **Sistema de Autenticação**
- Login OTP via email
- Registro com verificação de conta
- Sistema de sessão persistente
- Rotas protegidas

### 🎨 **Sistema de Design**
- Tema dinâmico (claro/escuro)
- Componentes reutilizáveis
- Design system baseado em Radix UI
- Tailwind CSS com tokens semânticos

### 📱 **Interface Responsiva**
- Layout adaptativo para mobile/desktop
- Sidebar colapsível
- Navegação intuitiva
- PWA ready

## 🛠️ Stack Tecnológica

- **Frontend**: React 18+ com TypeScript
- **Build**: Vite
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: React Context
- **Routing**: React Router DOM
- **Deploy**: Docker + Nginx + Traefik

## 🚀 Deploy

### **Status Atual:**
- ✅ **Build Docker:** Funcionando perfeitamente
- ✅ **Imagem:** `gwan-site:latest` (80.8MB)
- ✅ **Tempo de build:** ~14 segundos

### **Deploy Rápido:**
```bash
# 1. Criar rede
docker network create gwan

# 2. Build da imagem
docker build -t gwan-site:latest .

# 3. Deploy no Portainer
# Use o arquivo docker-compose.yml
```

### **Documentação de Deploy:**
- 📖 **`README_DEPLOY.md`** - Instruções rápidas
- 📚 **`PORTAINER_DEPLOY.md`** - Documentação completa
- 🐳 **`docker-compose.yml`** - Configuração principal

### **Deploy:**
- ✅ **Docker:** Multi-stage build otimizado
- ✅ **Nginx:** Configuração de produção
- ✅ **Traefik:** Labels configurados para `gwan.com.br`
- ✅ **Portainer:** Configuração completa para stack deployment
- ✅ **Variáveis de Ambiente:** Configuradas no Docker Compose

## 🔧 **Configuração de Ambiente**

### **Variáveis de Ambiente**
O projeto está configurado para usar variáveis de ambiente tanto em desenvolvimento quanto em produção.

#### **Arquivos de Configuração:**
- **`.env`** - Variáveis de desenvolvimento (não commitar)
- **`env.example`** - Exemplo de variáveis para produção
- **`docker-compose.yml`** - Variáveis configuradas para produção

#### **Variáveis Principais:**
```bash
# Aplicação
VITE_APP_NAME=Gwan IA
VITE_APP_VERSION=1.0.0
VITE_API_URL=https://api.gwan.com.br/api

# SMTP (Email)
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_SECURE=false

# Admin
VITE_ADMIN_EMAIL=admin@gwan.com.br
VITE_ADMIN_NAME=Administrador Gwan
```

#### **Variáveis Sensíveis (Configurar no Sistema):**
```bash
export SMTP_USER="seu-email@gmail.com"
export SMTP_PASSWORD="sua-senha-app"
export ADMIN_PASSWORD="senha-admin-segura"
export CHATWOOT_KEY="sua-chave-chatwoot"
```

### **Configuração para Produção:**
1. **Copie o arquivo de exemplo:** `cp env.example .env`
2. **Configure as variáveis sensíveis no sistema**
3. **Use o Docker Compose com as variáveis configuradas**

## 🏗️ Arquitetura

### **Estrutura de Pastas:**
```
src/
├── components/          # Componentes reutilizáveis
│   ├── auth/           # Componentes de autenticação
│   ├── chat/           # Sistema de chat
│   └── layout/         # Layout da aplicação
├── contexts/            # Contextos React (Auth, Theme)
├── hooks/               # Hooks customizados
├── pages/               # Páginas da aplicação
├── services/            # Serviços (Auth, HTTP)
├── theme/               # Sistema de design
└── utils/               # Utilitários
```

### **Padrões:**
- Clean Architecture
- SOLID Principles
- Component-based design
- Type-safe development

## 🎨 Sistema de Design

O projeto inclui um sistema de design completo baseado no [Radix UI Themes](https://www.radix-ui.com/themes/playground) com:

- **Componentes base**: Button, Input, Card com múltiplas variantes
- **Tokens de design**: Cores, tipografia, espaçamento, sombras
- **Tailwind CSS**: Framework CSS com configuração customizada
- **Responsivo**: Mobile-first approach
- **Acessível**: WCAG 2.1 AA compliance

### Componentes Disponíveis

```tsx
import { Button, Input, Card } from '@/theme';

// Botões com variantes
<Button variant="solid" color="accent">Ação</Button>
<Button variant="soft" color="success">Sucesso</Button>

// Inputs com variantes
<Input variant="surface" placeholder="Digite aqui..." />
<Input variant="ghost" leftIcon={<SearchIcon />} />

// Cards com subcomponentes
<Card variant="surface">
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>
```

## 📚 Documentação Organizada

As regras do Cursor estão organizadas na pasta `cursorrules/` para melhor estruturação:

### 🏠 **Regras Principais**
- **`cursorrules/main.md`** - Visão geral e regras principais do projeto

### 🏗️ **Arquitetura**
- **`cursorrules/architecture/clean-architecture.md`** - Clean Architecture e SOLID

### 🧩 **Componentes**
- **`cursorrules/components/react-components.md`** - Padrões de componentes React

### 🛠️ **Stack Tecnológica**
- **`cursorrules/stack/stack-tecnologica.md`** - Dependências e configurações

### 💻 **Desenvolvimento**
- **`cursorrules/development/typescript.md`** - Convenções TypeScript
- **`cursorrules/development/prd.md`** - Product Requirements Document
- **`cursorrules/development/plano-implementacao.md`** - Plano de implementação detalhado

### 🎨 **Sistema de Design**
- **`src/theme/README.md`** - Documentação completa do sistema de design
- **`src/theme/components/example-usage.tsx`** - Exemplos de uso dos componentes

### 📖 **Documentação Completa**
- **`cursorrules/README.md`** - Guia de uso das regras

## 🚀 Início Rápido

Para começar a desenvolver, consulte:
1. `cursorrules/main.md` - Regras gerais
2. `cursorrules/stack/stack-tecnologica.md` - Configurações técnicas
3. `cursorrules/architecture/clean-architecture.md` - Padrões arquiteturais
4. `src/theme/README.md` - Sistema de design

## 📱 Página de Autenticação
- **Localização**: `src/pages/auth.html`
- **Documentação**: `src/pages/README.md`
- **Funcionalidades**: Login, cadastro, ativação e verificação OTP
- **Design**: Totalmente responsivo usando Tailwind CSS e cores semânticas

## 🎨 Exemplos de Uso
- **Localização**: `src/pages/exemplo-uso.html`
- **Funcionalidades**: Demonstração interativa do sistema de design
- **Seções**: Cores, Componentes, Personalização e Integração
- **Uso**: Ideal para desenvolvedores entenderem como personalizar o tema

## 🏠 Página de Índice
- **Localização**: `src/pages/index.html`
- **Funcionalidades**: Navegação centralizada para todos os arquivos
- **Recursos**: Visão geral, funcionalidades e próximos passos
- **Uso**: Ponto de entrada para explorar o sistema de design

## 📝 Nota

Este arquivo serve como ponto de entrada. Para regras detalhadas, consulte os arquivos específicos na pasta `cursorrules/`. Para o sistema de design, consulte `src/theme/README.md`.
