# Sistema de Design - Gwan IA

Este é o sistema de design completo para o projeto Gwan IA, baseado no [Radix UI Themes](https://www.radix-ui.com/themes/playground) e implementado com Tailwind CSS.

## 🎨 Visão Geral

O sistema de design fornece:
- **Tokens de design** consistentes (cores, tipografia, espaçamento, sombras)
- **Componentes base** reutilizáveis (Button, Input, Card, etc.)
- **Variantes** para cada componente (Solid, Soft, Surface, Outline, Ghost)
- **Sistema responsivo** mobile-first
- **Acessibilidade** WCAG 2.1 AA compliance

## 🏗️ Estrutura

```
src/theme/
├── components/         # Componentes base
│   ├── button/         # Botões com variantes
│   ├── input/          # Campos de entrada
│   ├── card/           # Cards e containers
│   └── ...             # Outros componentes
├── tokens/             # Tokens de design
│   ├── colors.ts       # Sistema de cores
│   ├── typography.ts   # Sistema tipográfico
│   ├── spacing.ts      # Sistema de espaçamento
│   └── shadows.ts      # Sistema de sombras
├── utils/              # Utilitários
└── index.ts            # Exportações principais
```

## 🚀 Uso Rápido

### Importar componentes

```tsx
import { Button, Input, Card } from '@/theme';

// Ou importar individualmente
import { Button } from '@/theme/components/button';
```

### Usar componentes

```tsx
// Botão com variantes
<Button variant="solid" color="accent" size="lg">
  Clique aqui
</Button>

// Input com ícones
<Input 
  variant="surface" 
  leftIcon={<SearchIcon />}
  placeholder="Buscar..."
/>

// Card com subcomponentes
<Card variant="surface">
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição do card</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo do card
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>
```

## 🎯 Tokens de Design

### Cores

```tsx
import { colors } from '@/theme';

// Cores de destaque
colors.accent.primary       // Cor primária
colors.accent.primaryHover  // Cor primária hover

// Cores neutras
colors.gray.background      // Background mais claro
colors.gray.black           // Texto mais escuro

// Cores semânticas
colors.success.primary      // Verde de sucesso
colors.error.primary        // Vermelho de erro
colors.warning.primary      // Amarelo de warning
```

### Tipografia

```tsx
import { typography } from '@/theme';

// Estilos pré-definidos
typography.textStyles.h1    // Título H1
typography.textStyles.body  // Texto do corpo
typography.textStyles.ui    // Texto de interface

// Escalas customizadas
typography.fontSize.lg      // 18px
typography.fontWeight.bold  // 700
```

### Espaçamento

```tsx
import { spacing, componentSpacing } from '@/theme';

// Escala base (8px grid)
spacing[4]                  // 16px
spacing[6]                  // 24px

// Espaçamento de componentes
componentSpacing.padding.lg // 24px
componentSpacing.gap.md     // 12px
```

### Sombras

```tsx
import { shadows, componentShadows } from '@/theme';

// Sombras base
shadows.sm                  // Sombra pequena
shadows.lg                  // Sombra grande

// Sombras de componentes
componentShadows.card.hover // Sombra de card no hover
componentShadows.button.active // Sombra de botão ativo
```

## 🔧 Variantes de Componentes

### Button

- **Solid**: Preenchido com cor sólida
- **Soft**: Fundo suave com cor
- **Surface**: Fundo com borda
- **Outline**: Contorno apenas
- **Ghost**: Transparente com hover

### Input

- **Classic**: Estilo clássico com fundo branco
- **Surface**: Fundo cinza claro
- **Soft**: Fundo cinza médio
- **Ghost**: Transparente

### Card

- **Surface**: Fundo branco com borda
- **Classic**: Fundo cinza claro
- **Ghost**: Transparente

## 📱 Responsividade

O sistema é mobile-first e inclui breakpoints:

```tsx
import { responsiveClasses, combineResponsiveClasses } from '@/theme/utils';

const responsive = responsiveClasses(
  'text-sm',           // Base (mobile)
  'text-base',         // sm: (640px+)
  'text-lg',           // md: (768px+)
  'text-xl',           // lg: (1024px+)
  'text-2xl'           // xl: (1280px+)
);

const classes = combineResponsiveClasses(responsive);
// Resultado: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
```

## 🎨 Customização

### Cores Customizadas

```tsx
import { createColorPalette } from '@/theme/utils';

const customPalette = createColorPalette('#3B82F6', 9);
```

### Variantes Customizadas

```tsx
import { createVariantClasses } from '@/theme/utils';

const buttonVariants = createVariantClasses({
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-500 text-white',
  danger: 'bg-red-500 text-white'
}, 'primary');

const buttonClass = buttonVariants('secondary'); // "bg-gray-500 text-white"
```

## 📚 Exemplos

Veja o arquivo `example-usage.tsx` para exemplos completos de todos os componentes e suas variantes.

## 🔗 Integração com Tailwind

O sistema usa as classes do Tailwind CSS e pode ser facilmente customizado através do `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // As cores do tema são automaticamente disponíveis
        accent: { /* ... */ },
        gray: { /* ... */ }
      }
    }
  }
}
```

## 🧪 Testes

Para testar os componentes:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/theme';

test('Button renders correctly', () => {
  render(<Button>Teste</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

## 📖 Documentação

- [Radix UI Themes](https://www.radix-ui.com/themes/playground) - Inspiração e referência
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [clsx](https://github.com/lukeed/clsx) - Utilitário para classes condicionais
