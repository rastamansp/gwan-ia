# 🚀 Página de Autenticação - Gwan IA

Esta é a página base de autenticação criada com nosso sistema de design, implementando todas as telas necessárias para o fluxo de autenticação OTP.

## 🎯 **Funcionalidades Implementadas**

### **1. Tela de Login**
- Campo de email com validação
- Botão de continuar que redireciona para verificação
- Link para cadastro de nova conta
- Design responsivo e acessível

### **2. Tela de Cadastro**
- Campo de nome completo
- Campo de email com validação
- Botão de criação de conta
- Link para voltar ao login

### **3. Tela de Ativação**
- Confirmação de conta criada
- Instruções para verificar email
- Botão para prosseguir com verificação
- Botão para voltar ao login

### **4. Tela de Verificação de Código**
- 6 campos OTP para código de verificação
- Navegação automática entre campos
- Botão de verificação
- Opção de reenvio de código
- Botão para voltar ao login

## 🎨 **Sistema de Design Aplicado**

### **Cores Semânticas**
- **Accent**: Cores primárias e de destaque
- **Gray**: Escala neutra para textos e backgrounds
- **Success**: Verde para confirmações
- **Warning**: Amarelo para avisos
- **Error**: Vermelho para erros e validações

### **Componentes Estilizados**
- **Botões**: Primary, Secondary, Outline, Ghost
- **Inputs**: Classic, Surface, com estados de erro
- **Cards**: Surface, Classic, Ghost
- **Tipografia**: Hierarquia clara com Inter font

### **Animações e Transições**
- Fade-in ao trocar de tela
- Hover effects nos botões
- Focus states nos inputs
- Transições suaves

## 🛠️ **Como Usar**

### **1. Abrir a Página**
```bash
# Navegue até a pasta
cd src/pages

# Abra no navegador
open auth.html
# ou
start auth.html
```

### **2. Fluxo de Teste**
1. **Login**: Digite um email válido e clique "Continuar"
2. **Cadastro**: Preencha nome e email, clique "Criar conta"
3. **Ativação**: Confirmação visual, clique "Já ativei minha conta"
4. **Verificação**: Digite 6 dígitos no código OTP

### **3. Navegação Entre Telas**
- Use os botões de navegação
- Ou chame `showScreen('screen-name')` no console

## 🔧 **Personalização**

### **Cores do Tema**
```javascript
// No arquivo auth.html, seção tailwind.config
colors: {
    accent: {
        primary: 'hsl(221 83% 53%)',      // Cor primária
        primaryHover: 'hsl(221 83% 47%)', // Hover da primária
        // ... outras cores
    }
}
```

### **Estilos dos Componentes**
```css
/* Botões */
.btn-primary { @apply bg-accent-primary text-white; }
.btn-secondary { @apply bg-gray-surface text-gray-strongText; }

/* Inputs */
.input-classic { @apply bg-white border border-gray-border; }
.input-error { @apply border-error-primary text-error-text; }

/* Cards */
.card-surface { @apply bg-white border border-gray-border; }
```

### **Animações**
```css
/* Transições */
.auth-screen.active {
    animation: fadeIn 0.5s ease-in-out;
}

/* Keyframes */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

## 📱 **Responsividade**

A página é totalmente responsiva com:
- **Mobile-first** approach
- **Breakpoints** do Tailwind CSS
- **Flexbox** para layouts adaptativos
- **Espaçamento** proporcional em diferentes telas

## ♿ **Acessibilidade**

### **Implementado**
- **Labels** para todos os campos
- **Focus states** visíveis
- **Contraste** adequado (WCAG AA)
- **Navegação** por teclado
- **Semântica** HTML correta

### **Recomendações para Produção**
- Adicionar **ARIA labels** específicos
- Implementar **screen reader** support
- Adicionar **skip links** para navegação
- Testar com **leitores de tela**

## 🚀 **Próximos Passos**

### **1. Integração com Backend**
```javascript
// Exemplo de integração
async function handleLogin(email) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            showScreen('verification-screen');
        }
    } catch (error) {
        console.error('Erro no login:', error);
    }
}
```

### **2. Validações Avançadas**
- Validação de força de senha
- Rate limiting para tentativas
- Captcha para segurança
- Validação de domínio de email

### **3. Estados de Loading**
```javascript
// Adicionar estados de loading
function setLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<svg class="animate-spin h-4 w-4 mr-2">...</svg>Carregando...';
    } else {
        button.disabled = false;
        button.innerHTML = 'Continuar';
    }
}
```

### **4. Tratamento de Erros**
```javascript
// Exibir mensagens de erro
function showError(message, type = 'error') {
    const errorDiv = document.createElement('div');
    errorDiv.className = `bg-${type}-background border border-${type}-border text-${type}-text p-3 rounded-lg mb-4`;
    errorDiv.textContent = message;
    
    // Inserir antes do formulário
    const form = document.querySelector('form');
    form.parentNode.insertBefore(errorDiv, form);
}
```

## 📁 **Estrutura de Arquivos**

```
src/pages/
├── auth.html              # Página principal de autenticação
├── exemplo-uso.html       # Exemplos de uso e personalização
├── README.md              # Esta documentação
└── assets/                # Recursos adicionais (futuro)
    ├── images/            # Imagens e ícones
    ├── css/               # Estilos customizados
    └── js/                # Scripts adicionais
```

## 🔗 **Integração com o Sistema**

### **1. React Components**
```tsx
// Converter para componentes React
import { Button, Input, Card } from '@/theme';

export const LoginScreen = () => (
    <Card variant="surface" className="p-8">
        <h2>Entrar na sua conta</h2>
        <Input type="email" placeholder="seu@email.com" />
        <Button variant="solid" color="accent">Continuar</Button>
    </Card>
);
```

### **2. TypeScript**
```typescript
// Tipos para as telas
interface AuthScreen {
    id: string;
    title: string;
    description: string;
    component: React.ComponentType;
}

const authScreens: AuthScreen[] = [
    { id: 'login', title: 'Login', description: 'Entre na sua conta', component: LoginScreen },
    // ... outras telas
];
```

### **3. Estado Global**
```typescript
// Zustand store para autenticação
interface AuthStore {
    currentScreen: string;
    user: User | null;
    isLoading: boolean;
    setScreen: (screen: string) => void;
    login: (email: string) => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
    currentScreen: 'login',
    user: null,
    isLoading: false,
    setScreen: (screen) => set({ currentScreen: screen }),
    login: async (email) => {
        set({ isLoading: true });
        // Lógica de login
        set({ isLoading: false, currentScreen: 'verification' });
    }
}));
```

## 🎨 **Customização Visual**

### **1. Logo e Branding**
```html
<!-- Substituir o logo atual -->
<div class="w-16 h-16 bg-accent-primary rounded-2xl mx-auto mb-4">
    <img src="/logo.png" alt="Gwan IA Logo" class="w-full h-full object-contain" />
</div>
```

### **2. Cores da Marca**
```javascript
// Personalizar cores no Tailwind config
colors: {
    brand: {
        primary: '#FF6B35',      // Laranja personalizado
        secondary: '#004E89',    // Azul personalizado
        accent: '#FFE156'        // Amarelo personalizado
    }
}
```

### **3. Tipografia**
```css
/* Fonte personalizada */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
    font-family: 'Poppins', sans-serif;
}
```

## 🧪 **Testes**

### **1. Testes Manuais**
- [ ] Navegação entre todas as telas
- [ ] Validação de formulários
- [ ] Responsividade em diferentes dispositivos
- [ ] Acessibilidade com teclado

### **2. Testes Automatizados**
```javascript
// Exemplo com Jest + Testing Library
test('should show verification screen after login', () => {
    render(<AuthPage />);
    
    const emailInput = screen.getByPlaceholderText('seu@email.com');
    const submitButton = screen.getByText('Continuar');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Verificação de código')).toBeInTheDocument();
});
```

## 📚 **Recursos Adicionais**

- **Tailwind CSS**: [Documentação oficial](https://tailwindcss.com/)
- **Inter Font**: [Google Fonts](https://fonts.google.com/specimen/Inter)
- **Acessibilidade**: [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- **Design System**: [Radix UI Themes](https://www.radix-ui.com/themes/playground)

## 📚 **Arquivos de Exemplo**

### **exemplo-uso.html**
- **Localização**: `src/pages/exemplo-uso.html`
- **Funcionalidades**: Demonstração interativa do sistema de design
- **Seções**: 
  - 🎨 **Cores**: Visualização das cores semânticas
  - 🧩 **Componentes**: Demonstração dos componentes base
  - 🎨 **Personalização**: Como customizar cores e tipografia
  - 🔗 **Integração**: Exemplos de integração com backend
- **Uso**: Ideal para desenvolvedores entenderem como personalizar o tema
- **Interativo**: Navegação entre seções e demonstrações práticas

---

**🎉 A página está pronta para uso e evolução!** 

Use como base para implementar a autenticação real e personalizar conforme as necessidades do projeto Gwan IA.
