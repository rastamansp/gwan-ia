import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'fs';

// Lê o package.json para obter a versão
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Garante que o React seja tratado corretamente em produção
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Expõe a versão do package.json como variável global
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  server: {
    port: 3001,
    strictPort: true,
    open: true,
    host: true,
  },
  build: {
    // Aumenta o limite de aviso para 600KB (opcional, mas ajuda a reduzir avisos)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Code-splitting manual para otimizar o tamanho dos chunks
        manualChunks: (id) => {
          // React e React DOM - sempre no chunk principal (index.js) para evitar problemas de lazy loading
          // Não separar React para garantir que esteja sempre disponível
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom')
          ) {
            // Não retornar nada (ou retornar null) faz com que fique no chunk principal
            return;
          }

          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'react-router-vendor';
          }

          // Radix UI components
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-ui-vendor';
          }

          // Lucide React (ícones)
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide-vendor';
          }

          // OpenTelemetry (monitoramento)
          if (id.includes('node_modules/@opentelemetry')) {
            return 'opentelemetry-vendor';
          }

          // Axios e outras bibliotecas HTTP
          if (id.includes('node_modules/axios')) {
            return 'http-vendor';
          }

          // Lodash
          if (id.includes('node_modules/lodash')) {
            return 'lodash-vendor';
          }

          // React Markdown
          if (id.includes('node_modules/react-markdown')) {
            return 'markdown-vendor';
          }

          // React Hot Toast
          if (id.includes('node_modules/react-hot-toast')) {
            return 'toast-vendor';
          }

          // Date-fns
          if (id.includes('node_modules/date-fns')) {
            return 'date-vendor';
          }

          // Zustand
          if (id.includes('node_modules/zustand')) {
            return 'zustand-vendor';
          }

          // Outras dependências do node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
