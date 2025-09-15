import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'fs';

// Lê o package.json para obter a versão
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
});
