// src/utils/env-validation.ts
import env from '../config/env';

// Interface para definir configurações obrigatórias
interface RequiredEnvConfig {
  // Configurações básicas da aplicação
  VITE_API_URL: string;
  VITE_APP_NAME: string;
  VITE_APP_VERSION: string;

  // Configurações de IA
  VITE_GWAN_MART_CHAT_URL?: string;

  // Configurações de monitoramento (obrigatórias em produção)
  VITE_OTEL_EXPORTER_OTLP_ENDPOINT?: string;
  VITE_OTEL_SERVICE_NAME?: string;
  VITE_OTEL_SERVICE_VERSION?: string;

  // Configurações de log
  VITE_LOG_LEVEL?: string;
}

// Configurações obrigatórias por ambiente
const REQUIRED_CONFIGS: Record<string, (keyof RequiredEnvConfig)[]> = {
  development: [
    'VITE_API_URL',
    'VITE_APP_NAME',
    'VITE_APP_VERSION',
    'VITE_GWAN_MART_CHAT_URL',
  ],
  production: [
    'VITE_API_URL',
    'VITE_APP_NAME',
    'VITE_APP_VERSION',
    'VITE_GWAN_MART_CHAT_URL',
    'VITE_LOG_LEVEL',
    // OTEL é opcional em produção - usar valor padrão se não configurado
  ],
  test: [
    'VITE_API_URL',
    'VITE_APP_NAME',
    'VITE_APP_VERSION',
    'VITE_GWAN_MART_CHAT_URL',
  ],
};

// Validações específicas para cada variável
const VALIDATION_RULES: Record<string, (value: string) => boolean> = {
  VITE_API_URL: (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  VITE_APP_NAME: (value: string) => value.length > 0,
  VITE_APP_VERSION: (value: string) => /^\d+\.\d+\.\d+/.test(value),
  VITE_GWAN_MART_CHAT_URL: (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  VITE_OTEL_EXPORTER_OTLP_ENDPOINT: (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  VITE_OTEL_SERVICE_NAME: (value: string) => value.length > 0,
  VITE_OTEL_SERVICE_VERSION: (value: string) => /^\d+\.\d+\.\d+/.test(value),
  VITE_LOG_LEVEL: (value: string) =>
    ['debug', 'info', 'warn', 'error'].includes(value),
};

// Mensagens de erro personalizadas
const ERROR_MESSAGES: Record<string, string> = {
  VITE_API_URL:
    'URL da API deve ser uma URL válida (ex: https://api.gwan.com.br)',
  VITE_APP_NAME: 'Nome da aplicação não pode estar vazio',
  VITE_APP_VERSION: 'Versão deve seguir o formato semântico (ex: 1.0.0)',
  VITE_GWAN_MART_CHAT_URL:
    'URL do Gwan Mart Chat deve ser uma URL válida (ex: http://api-mart.gwan.com.br/api/chat)',
  VITE_OTEL_EXPORTER_OTLP_ENDPOINT:
    'Endpoint OpenTelemetry deve ser uma URL válida (ex: http://gwan.com.br:4317)',
  VITE_OTEL_SERVICE_NAME: 'Nome do serviço OpenTelemetry não pode estar vazio',
  VITE_OTEL_SERVICE_VERSION:
    'Versão do serviço deve seguir o formato semântico (ex: 1.0.0)',
  VITE_LOG_LEVEL: 'Nível de log deve ser: debug, info, warn ou error',
};

// Função para obter valor da variável de ambiente
const getEnvValue = (key: string): string | undefined => {
  return (import.meta.env as any)[key] as string | undefined;
};

// Função para validar uma variável específica
const validateEnvVariable = (
  key: string,
  value: string | undefined
): { valid: boolean; error?: string } => {
  if (!value) {
    return {
      valid: false,
      error: `Variável de ambiente ${key} não está definida`,
    };
  }

  const validator = VALIDATION_RULES[key];
  if (validator && !validator(value)) {
    return {
      valid: false,
      error: ERROR_MESSAGES[key] || `Valor inválido para ${key}: ${value}`,
    };
  }

  return { valid: true };
};

// Função principal de validação
export const validateEnvironment = (): { valid: boolean; errors: string[] } => {
  const currentEnv = env.NODE_ENV || 'development';
  const requiredKeys =
    REQUIRED_CONFIGS[currentEnv] || REQUIRED_CONFIGS.development;
  const errors: string[] = [];

  console.log(`🔍 Validando configurações de ambiente para: ${currentEnv}`);
  console.log(`📋 Variáveis obrigatórias: ${requiredKeys.join(', ')}`);

  // Validar cada variável obrigatória
  for (const key of requiredKeys) {
    const value = getEnvValue(key);
    const validation = validateEnvVariable(key, value);

    if (!validation.valid) {
      errors.push(`❌ ${validation.error}`);
    } else {
      console.log(`✅ ${key}: ${value}`);
    }
  }

  // Validações adicionais específicas do ambiente
  if (currentEnv === 'production') {
    // Validar se a API URL é HTTPS em produção
    const apiUrl = getEnvValue('VITE_API_URL');
    if (apiUrl && !apiUrl.startsWith('https://')) {
      errors.push('❌ Em produção, VITE_API_URL deve usar HTTPS');
    }

    // Validar se não está em modo debug em produção
    if (env.IS_DEV) {
      errors.push('❌ Aplicação não pode estar em modo debug em produção');
    }
  }

  // Validar configurações de monitoramento
  const otelEndpoint = getEnvValue('VITE_OTEL_EXPORTER_OTLP_ENDPOINT');
  if (otelEndpoint && currentEnv === 'production') {
    try {
      const url = new URL(otelEndpoint);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        errors.push(
          '❌ VITE_OTEL_EXPORTER_OTLP_ENDPOINT deve usar protocolo HTTP ou HTTPS'
        );
      }
    } catch {
      errors.push(
        '❌ VITE_OTEL_EXPORTER_OTLP_ENDPOINT deve ser uma URL válida'
      );
    }
  }

  const isValid = errors.length === 0;

  if (isValid) {
    console.log('✅ Todas as configurações de ambiente estão válidas!');
  } else {
    console.error('❌ Erros encontrados na validação de ambiente:');
    errors.forEach(error => console.error(`  ${error}`));
  }

  return { valid: isValid, errors };
};

// Função para exibir erro detalhado e parar a aplicação
export const handleEnvironmentError = (errors: string[]): never => {
  const errorMessage = `
🚨 ERRO DE CONFIGURAÇÃO DE AMBIENTE 🚨

As seguintes configurações estão faltando ou inválidas:

${errors.map(error => `  ${error}`).join('\n')}

📋 CONFIGURAÇÕES NECESSÁRIAS:

Para desenvolvimento (.env):
  VITE_API_URL=https://api.gwan.com.br
  VITE_APP_NAME=Gwan IA
  VITE_APP_VERSION=1.0.0
  VITE_GWAN_MART_CHAT_URL=http://localhost:3009/api/chat

Para produção (env.production):
  VITE_API_URL=https://api.gwan.com.br
  VITE_APP_NAME=Gwan IA
  VITE_APP_VERSION=1.1.0
  VITE_GWAN_MART_CHAT_URL=http://api-mart.gwan.com.br/api/chat
  VITE_OTEL_EXPORTER_OTLP_ENDPOINT=http://gwan.com.br:4317
  VITE_OTEL_SERVICE_NAME=gwan-ia-frontend
  VITE_OTEL_SERVICE_VERSION=1.1.0
  VITE_LOG_LEVEL=info

🔧 COMO CORRIGIR:

1. Verifique se o arquivo .env existe na raiz do projeto
2. Copie o arquivo env.example para .env se necessário
3. Configure todas as variáveis obrigatórias
4. Reinicie a aplicação

📚 Documentação: MONITORING.md
  `;

  // Exibir erro no console
  console.error(errorMessage);

  // Exibir erro na interface (se possível)
  if (typeof document !== 'undefined') {
    document.body.innerHTML = `
      <div style="
        font-family: 'Courier New', monospace;
        background: #1a1a1a;
        color: #ff6b6b;
        padding: 20px;
        margin: 0;
        min-height: 100vh;
        white-space: pre-line;
        line-height: 1.5;
      ">
        ${errorMessage}
      </div>
    `;
  }

  // Parar a aplicação
  throw new Error('Configuração de ambiente inválida');
};

// Função para inicializar validação
export const initializeEnvironmentValidation = (): void => {
  console.log('🔧 Iniciando validação de ambiente...');

  const validation = validateEnvironment();

  if (!validation.valid) {
    handleEnvironmentError(validation.errors);
  }

  console.log('🎉 Validação de ambiente concluída com sucesso!');
};

export default {
  validateEnvironment,
  handleEnvironmentError,
  initializeEnvironmentValidation,
};
