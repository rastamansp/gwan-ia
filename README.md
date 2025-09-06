# 🚀 Gwan IA - Plataforma de Inteligência Artificial

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

#### **🛒 Gwan Mart - E-commerce**
- **Loja online** com produtos tecnológicos premium
- **Página de produtos** com galeria de imagens
- **Páginas de detalhes** dinâmicas por produto
- **Integração WhatsApp** para compras
- **Seleção de opções** obrigatória (cores, armazenamento)
- **Controles de quantidade** e origem do frete
- **Campo CEP** opcional para cálculo de frete
- **Mensagens formatadas** com dados completos do produto
- **Navegação unificada** em todas as páginas

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
- `/gwan-mart` - Loja online Gwan Mart
- `/gwan-mart/product/:productId` - Página de detalhes do produto
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

## 📝 Licença

MIT License
