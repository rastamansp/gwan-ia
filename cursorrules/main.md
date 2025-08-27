# Regras do Projeto Gwan IA - Sistema Administrativo

## Visão Geral
Sistema administrativo interno para o site Gwan, desenvolvido com React TypeScript seguindo princípios de Clean Architecture e SOLID.

## Stack Tecnológica
- **Frontend**: React 18+ com TypeScript
- **Build Tool**: Vite
- **Package Manager**: npm
- **Styling**: CSS Modules ou Styled Components
- **State Management**: Zustand ou Context API
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode

## Arquitetura e Padrões
- **Clean Architecture**: Separação clara entre camadas (UI, Domain, Data)
- **SOLID Principles**: Aplicação rigorosa dos princípios SOLID
- **Component Design**: Componentes reutilizáveis e modulares
- **Folder Structure**: Organização por funcionalidade (feature-based)
- **Type Safety**: Uso extensivo de TypeScript com tipos bem definidos

## Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
├── features/           # Funcionalidades organizadas por domínio
├── hooks/              # Custom hooks
├── services/           # Serviços de API e externos
├── types/              # Definições de tipos TypeScript
├── utils/              # Utilitários e helpers
├── constants/          # Constantes da aplicação
└── styles/             # Estilos globais e temas
```

## Padrões de Código
- **Naming**: camelCase para variáveis/funções, PascalCase para componentes
- **File Naming**: kebab-case para arquivos
- **Import Order**: Bibliotecas externas, internas, relativas
- **Component Structure**: Props interface, component, export default
- **Error Handling**: Tratamento consistente de erros com fallbacks

## Performance e Qualidade
- **Bundle Size**: Otimização para carregamento rápido
- **Code Splitting**: Lazy loading de rotas e componentes
- **Accessibility**: Conformidade com WCAG 2.1
- **Responsive Design**: Mobile-first approach
- **SEO**: Meta tags e estrutura semântica adequada

## Hosting e Deploy
- **URL**: http://www.admin.gwan.com.br
- **Environment**: Configurações separadas para dev, staging e prod
- **Build Process**: Pipeline automatizado de build e deploy
