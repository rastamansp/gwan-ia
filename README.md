# 🚀 Gwan IA - Plataforma de Inteligência Artificial

## 📋 Status do Projeto

### ✅ **Funcionalidades Implementadas**

#### **🏠 Página Inicial (HomePage)**
- Design responsivo com tema personalizado
- Seção "Experimente" com cards dos chatbots
- Navegação com dropdown de Chatbots
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

#### **💬 Chat Widget**
- Widget flutuante para conversas
- Integração com webhooks externos
- Histórico de conversas
- Endpoints específicos para cada bot

#### **🎨 Design System**
- Tema personalizado com Tailwind CSS
- Tokens de cores semânticas
- Componentes reutilizáveis
- Sistema de tipografia e espaçamento
- Suporte a temas claro/escuro

#### **🏗️ Arquitetura**
- Clean Architecture implementada
- Componentes modulares e reutilizáveis
- Context API para gerenciamento de estado
- Hooks customizados
- TypeScript com configuração estrita

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
```

## 🐳 Docker

```bash
# Build e execução local
docker-compose up -d

# Acesso local
http://localhost:8080
```

## 📝 Licença

MIT License
