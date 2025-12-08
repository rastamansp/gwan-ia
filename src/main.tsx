import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './styles/chatbot-styles.css';

// Validar configurações de ambiente ANTES de tudo
import { initializeEnvironmentValidation } from './utils/env-validation';

// Inicializar telemetria antes de tudo
import { initializeTelemetry } from './utils/telemetry';
import { logger } from './utils/logger';
import env from './config/env';

// 1. VALIDAÇÃO DE AMBIENTE (CRÍTICO - PARA A APLICAÇÃO SE HOUVER ERRO)
console.log('🚀 Iniciando aplicação Gwan IA...');
initializeEnvironmentValidation();

// 2. INICIALIZAÇÃO DE MONITORAMENTO
initializeTelemetry();
logger.info('Aplicação Gwan IA iniciando', {
  component: 'App',
  action: 'startup',
  version: env.APP_VERSION || '1.0.0',
  environment: env.NODE_ENV || 'development',
});

// 3. INICIALIZAÇÃO DO REACT
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
