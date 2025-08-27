# Stack Tecnológica - Projeto Gwan IA

## Dependências Principais

### React e TypeScript
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0"
}
```

### Build Tools
```json
{
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.0.0",
  "vite-tsconfig-paths": "^4.0.0"
}
```

### State Management
```json
{
  "zustand": "^4.4.0",
  "immer": "^10.0.0"
}
```

### Routing
```json
{
  "react-router-dom": "^6.8.0",
  "@types/react-router-dom": "^5.3.0"
}
```

### Styling e Design System
```json
{
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0",
  "@tailwindcss/forms": "^0.5.0",
  "@tailwindcss/typography": "^0.5.0"
}
```

### Testing
```json
{
  "jest": "^29.0.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "@testing-library/user-event": "^14.0.0",
  "jest-environment-jsdom": "^29.0.0"
}
```

### Linting e Formatação
```json
{
  "eslint": "^8.0.0",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "eslint-plugin-react": "^7.0.0",
  "eslint-plugin-react-hooks": "^4.0.0",
  "prettier": "^3.0.0",
  "eslint-config-prettier": "^9.0.0"
}
```

### Utilitários
```json
{
  "date-fns": "^2.30.0",
  "lodash-es": "^4.17.0",
  "@types/lodash-es": "^4.17.0",
  "zod": "^3.22.0",
  "axios": "^1.6.0"
}
```

## Configurações

### TypeScript (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/features/*": ["src/features/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/services/*": ["src/services/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"],
      "@/constants/*": ["src/constants/*"],
      "@/styles/*": ["src/styles/*"],
      "@/theme/*": ["src/theme/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Vite (vite.config.ts)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['lodash-es', 'date-fns']
        }
      }
    }
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  }
});
```

### Tailwind CSS (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores baseadas no Radix UI
        accent: {
          1: 'hsl(var(--accent-1))',
          2: 'hsl(var(--accent-2))',
          3: 'hsl(var(--accent-3))',
          4: 'hsl(var(--accent-4))',
          5: 'hsl(var(--accent-5))',
          6: 'hsl(var(--accent-6))',
          7: 'hsl(var(--accent-7))',
          8: 'hsl(var(--accent-8))',
          9: 'hsl(var(--accent-9))',
          10: 'hsl(var(--accent-10))',
          11: 'hsl(var(--accent-11))',
          12: 'hsl(var(--accent-12))',
        },
        gray: {
          1: 'hsl(var(--gray-1))',
          2: 'hsl(var(--gray-2))',
          3: 'hsl(var(--gray-3))',
          4: 'hsl(var(--gray-4))',
          5: 'hsl(var(--gray-5))',
          6: 'hsl(var(--gray-6))',
          7: 'hsl(var(--gray-7))',
          8: 'hsl(var(--gray-8))',
          9: 'hsl(var(--gray-9))',
          10: 'hsl(var(--gray-10))',
          11: 'hsl(var(--gray-11))',
          12: 'hsl(var(--gray-12))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

### PostCSS (postcss.config.js)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### ESLint (.eslintrc.js)
```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
```

### Prettier (.prettierrc)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid"
}
```

### Jest (jest.config.js)
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}'
  ]
};
```

## Scripts do Package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  }
}
```

## Estrutura de Pastas Recomendada

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (Button, Input, etc.)
│   ├── layout/         # Componentes de layout (Header, Sidebar, etc.)
│   └── business/       # Componentes específicos do negócio
├── features/           # Funcionalidades organizadas por domínio
│   ├── auth/           # Autenticação
│   ├── users/          # Gerenciamento de usuários
│   ├── content/        # Gerenciamento de conteúdo
│   └── dashboard/      # Dashboard e analytics
├── theme/              # Sistema de design
│   ├── components/     # Componentes base do design system
│   ├── tokens/         # Tokens de design
│   ├── variants/       # Variantes de componentes
│   └── utils/          # Utilitários do tema
├── hooks/              # Custom hooks
├── services/           # Serviços de API e externos
├── types/              # Definições de tipos TypeScript
├── utils/              # Utilitários e helpers
├── constants/          # Constantes da aplicação
├── styles/             # Estilos globais e temas
├── assets/             # Imagens, ícones, etc.
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── vite-env.d.ts       # Tipos do Vite
```

## Configurações de Ambiente

### .env.development
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Gwan Admin (Dev)
VITE_DEBUG=true
VITE_LOG_LEVEL=debug
```

### .env.production
```env
VITE_API_URL=https://api.gwan.com.br
VITE_APP_NAME=Gwan Admin
VITE_DEBUG=false
VITE_LOG_LEVEL=error
```

## Dependências de Desenvolvimento

```json
{
  "devDependencies": {
    "@types/node": "^20.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0",
    "ts-jest": "^29.0.0",
    "identity-obj-proxy": "^3.0.0"
  }
}
```

## Configurações de Git

### .gitignore
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Production
dist/
build/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

### .husky/pre-commit
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test
```
