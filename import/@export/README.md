# Test-Chatbot - Funcionalidade de Exportação

Este pacote contém todos os arquivos necessários para implementar a funcionalidade de test-chatbot (chatbot com aparência de iPhone) em outro projeto React.

## 📋 Estrutura de Arquivos

```
@export/
├── README.md                          # Este arquivo
├── pages/                             # Páginas
│   └── TestChatbot.page.tsx          # Página principal do test-chatbot
├── components/                        # Componentes React
│   ├── chatbot-showcase/             # Componentes do chatbot
│   │   ├── PhoneMockup.tsx           # Mockup de iPhone
│   │   ├── ChatInterface.tsx         # Interface principal do chat
│   │   ├── ChatBubble.tsx             # Bolhas de mensagem
│   │   ├── WhatsAppHeader.tsx        # Cabeçalho estilo WhatsApp
│   │   ├── EventCard.tsx             # Card de evento
│   │   └── InteractionsSelector.tsx  # Seletor de jornadas
│   └── ui/                           # Componentes UI base
│       └── dialog.tsx                 # Componente Dialog (Radix UI)
├── hooks/                            # Custom hooks
│   └── useInteractions.ts            # Hook para gerenciar jornadas
├── repositories/                     # Repositories
│   ├── ChatRepository.ts             # Implementação do repository
│   └── IChatRepository.ts            # Interface do repository
├── data/                             # Dados JSON
│   ├── journeys.json                 # Jornadas de conversação
│   └── chatData.json                 # Dados padrão do chat
├── utils/                            # Utilitários
│   └── cn.ts                         # Função para combinar classes
├── styles/                           # Estilos CSS
│   └── chatbot-styles.css            # Variáveis CSS e estilos do chatbot
└── integration/                      # Exemplos de integração
    ├── container-example.ts          # Exemplo de container DI
    └── http-client-example.ts        # Exemplo de configuração HTTP
```

## 🚀 Instalação

### Dependências Necessárias

Instale as seguintes dependências no seu projeto:

```bash
npm install react react-dom
npm install axios
npm install lucide-react
npm install @radix-ui/react-dialog
npm install clsx tailwind-merge
npm install tailwindcss-animate
npm install react-hot-toast
```

Ou com yarn:

```bash
yarn add react react-dom axios lucide-react @radix-ui/react-dialog clsx tailwind-merge tailwindcss-animate react-hot-toast
```

### Dependências de Desenvolvimento (TypeScript e Tailwind)

Se estiver usando TypeScript e Tailwind CSS:

```bash
npm install -D typescript @types/react @types/react-dom tailwindcss @tailwindcss/forms
```

## 📦 Integração

### Passo 1: Copiar Arquivos

Copie todos os arquivos da pasta `@export` para o seu projeto, mantendo a estrutura de pastas.

### Passo 2: Configurar Tailwind CSS

Adicione as seguintes extensões ao seu `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chat: {
          sent: "hsl(var(--chat-bubble-sent))",
          received: "hsl(var(--chat-bubble-received))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gradient": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "gradient": "gradient 3s ease infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}
```

### Passo 3: Importar Estilos CSS

Importe o arquivo CSS do chatbot no seu arquivo principal de estilos ou no componente raiz:

```typescript
// No seu index.css ou App.tsx
import './styles/chatbot-styles.css'
```

### Passo 4: Configurar Cliente HTTP

Crie um cliente HTTP configurado para se comunicar com sua API. Veja o exemplo em `integration/http-client-example.ts`:

```typescript
import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'http://localhost:3001/api', // ou process.env.REACT_APP_API_URL
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### Passo 5: Configurar Container de Dependências

Configure o container de injeção de dependências. Veja o exemplo em `integration/container-example.ts`:

```typescript
import { ChatRepository } from './repositories/ChatRepository'
import { createHttpClient } from './integration/http-client-example'

const httpClient = createHttpClient('http://localhost:3001/api')
const chatRepository = new ChatRepository(httpClient)
```

### Passo 6: Configurar Toaster (react-hot-toast)

Envolva sua aplicação com o Toaster do react-hot-toast:

```typescript
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      {/* Seus componentes */}
      <Toaster position="top-right" />
    </>
  )
}
```

### Passo 7: Adicionar a Página TestChatbot

Adicione a rota e use o componente:

```typescript
import { TestChatbotPage } from './pages/TestChatbot.page'
import { ChatRepository } from './repositories/ChatRepository'
import { createHttpClient } from './integration/http-client-example'

// No seu App.tsx ou componente de rotas
function App() {
  const httpClient = createHttpClient('http://localhost:3001/api')
  const chatRepository = new ChatRepository(httpClient)

  return (
    <Routes>
      <Route 
        path="/test-chatbot" 
        element={<TestChatbotPage chatRepository={chatRepository} />} 
      />
    </Routes>
  )
}
```

## 🎨 Personalização

### Estilos

Os componentes utilizam Tailwind CSS com variáveis CSS customizadas. Você pode personalizar as cores modificando as variáveis em `styles/chatbot-styles.css`:

```css
:root {
  --primary: 217 91% 60%;           /* Cor primária */
  --chat-bubble-sent: 90 50% 88%;  /* Cor bolha enviada */
  --chat-bubble-received: 0 0% 100%; /* Cor bolha recebida */
}
```

### Jornadas de Conversação

Edite `data/journeys.json` para adicionar ou modificar jornadas:

```json
{
  "journey": [
    {
      "name": "Nome da Jornada",
      "description": "Descrição opcional",
      "messages": [
        { "from": "user", "text": "Mensagem do usuário" },
        { "from": "concierge", "text": "Resposta do chatbot" }
      ]
    }
  ]
}
```

### Dados Padrão do Chat

Edite `data/chatData.json` para modificar a conversa padrão exibida quando nenhuma jornada está selecionada.

## 🔧 Configuração da API

O chatbot espera que a API tenha um endpoint `/chat` que aceite requisições POST com o seguinte formato:

### Request

```typescript
{
  message: string
}
```

### Response

```typescript
{
  answer: string
  formattedResponse?: {
    answer?: string
    data?: {
      type?: string
      suggestions?: string[]
      rawData?: EventItem[]
      items?: EventItem[]
    }
  }
  toolsUsed?: Array<{
    name: string
    arguments: Record<string, unknown>
  }>
}
```

### Exemplo de Requisição

```typescript
POST /api/chat
Content-Type: application/json

{
  "message": "Olá, como posso ajudar?"
}
```

### Exemplo de Resposta

```typescript
{
  "answer": "Olá! Estou aqui para ajudar você.",
  "formattedResponse": {
    "answer": "Olá! Estou aqui para ajudar você.",
    "data": {
      "type": "text",
      "suggestions": ["Ver eventos", "Comprar ingressos"]
    }
  }
}
```

## 📝 Uso Avançado

### Usar Componentes Individuais

Você pode usar os componentes individualmente:

```typescript
import { PhoneMockup } from './components/chatbot-showcase/PhoneMockup'
import { ChatInterface } from './components/chatbot-showcase/ChatInterface'
import { ChatRepository } from './repositories/ChatRepository'

function MyComponent() {
  const chatRepository = new ChatRepository(httpClient)
  
  return (
    <PhoneMockup>
      <ChatInterface chatRepository={chatRepository} />
    </PhoneMockup>
  )
}
```

### Implementar Repository Customizado

Você pode criar sua própria implementação de repository:

```typescript
import { IChatRepository, SendMessageRequest, SendMessageResponse } from './repositories/IChatRepository'

class MyCustomChatRepository implements IChatRepository {
  async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    // Sua implementação
  }
}
```

## 🐛 Troubleshooting

### Erro: "Cannot find module '@/...'"

**Solução:** Ajuste os imports para caminhos relativos ou configure path aliases no seu projeto.

### Estilos não aparecem

**Solução:** 
1. Verifique se `chatbot-styles.css` está importado
2. Verifique se as extensões do Tailwind foram adicionadas ao `tailwind.config.js`
3. Certifique-se de que o Tailwind está processando os arquivos corretos no `content`

### Componentes não aparecem

**Solução:**
1. Verifique se todas as dependências foram instaladas
2. Verifique se os imports estão corretos
3. Verifique o console do navegador para erros

### Animações não funcionam

**Solução:**
1. Certifique-se de que `tailwindcss-animate` está instalado
2. Verifique se as keyframes foram adicionadas ao `tailwind.config.js`

### Erro: "Failed to send message"

**Solução:**
1. Verifique se a URL da API está correta
2. Verifique se o endpoint `/chat` existe no backend
3. Verifique se as credenciais de autenticação estão corretas (se necessário)
4. Verifique se o CORS está configurado corretamente no backend

## 📚 Componentes Disponíveis

### PhoneMockup
Mockup de iPhone que envolve o conteúdo do chat.

```tsx
<PhoneMockup>
  <ChatInterface chatRepository={chatRepository} />
</PhoneMockup>
```

### ChatInterface
Interface principal do chat com suporte a jornadas customizadas.

```tsx
<ChatInterface 
  journeyMessages={messages}
  headerName="Nome do Chat"
  headerAvatar="🤖"
  chatRepository={chatRepository}
/>
```

### ChatBubble
Componente de bolha de mensagem individual.

```tsx
<ChatBubble
  type="text"
  content="Mensagem"
  sender="mentor"
  timestamp="10:30"
/>
```

### WhatsAppHeader
Cabeçalho estilo WhatsApp.

```tsx
<WhatsAppHeader
  name="Nome do Contato"
  avatar="👤"
  status="online"
/>
```

### InteractionsSelector
Seletor de jornadas de conversação.

```tsx
<InteractionsSelector
  open={isOpen}
  onOpenChange={setIsOpen}
  onSelectJourney={handleSelectJourney}
/>
```

## 🔒 Segurança

- O chatbot envia mensagens para o backend. Certifique-se de validar e sanitizar as mensagens no backend.
- Se estiver usando autenticação, configure os interceptors do axios corretamente.
- Não exponha informações sensíveis nas mensagens do bot.

## 📄 Licença

Este código é fornecido como está, para uso em outros projetos.

## 🤝 Suporte

Para dúvidas ou problemas, consulte a documentação do projeto original ou entre em contato com a equipe de desenvolvimento.

