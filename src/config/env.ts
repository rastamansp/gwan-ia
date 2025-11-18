interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_GWAN_MART_API_URL: string;
  readonly VITE_GWAN_MART_CHAT_URL: string;
  readonly VITE_GWAN_MART_AI_URL: string;
  readonly VITE_GWAN_EVENT_URL: string;
  readonly VITE_GWAN_LEGAL_AI_URL: string;
  readonly VITE_CHAT_HEALTH_API_URL: string;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly VITE_LOG_LEVEL: string;
  // Variáveis de monitoramento OpenTelemetry (com prefixo VITE_)
  readonly VITE_OTEL_EXPORTER_OTLP_ENDPOINT: string;
  readonly VITE_OTEL_SERVICE_NAME: string;
  readonly VITE_OTEL_SERVICE_VERSION: string;
  readonly VITE_OTEL_RESOURCE_ATTRIBUTES: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const env = {
  // API
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Gwan IA',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  // Gwan Mart API URL
  GWAN_MART_API_URL:
    import.meta.env.VITE_GWAN_MART_API_URL ||
    import.meta.env.VITE_API_URL ||
    'http://localhost:3009/api',
  // Gwan Mart Chat URL
  GWAN_MART_CHAT_URL:
    import.meta.env.VITE_GWAN_MART_CHAT_URL ||
    'http://localhost:3009/api/api/chat',
  // Gwan Mart AI Agent
  VITE_GWAN_MART_AI_URL:
    import.meta.env.VITE_GWAN_MART_AI_URL ||
    'http://localhost:7410/api/ai-agent/chat',
  // Gwan Events URL
  VITE_GWAN_EVENT_URL:
    import.meta.env.VITE_GWAN_EVENT_URL || 'https://events.gwan.com.br/',
  // Gwan Legal AI URL
  VITE_GWAN_LEGAL_AI_URL:
    import.meta.env.VITE_GWAN_LEGAL_AI_URL || 'https://legal-ai.gwan.com.br/',
  // Chat Health API URL
  VITE_CHAT_HEALTH_API_URL:
    import.meta.env.VITE_CHAT_HEALTH_API_URL ||
    'http://localhost:3001/api/chat-health',
  // Environment
  NODE_ENV: import.meta.env.MODE || 'development',
  IS_DEV: import.meta.env.DEV || false,
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
  // OpenTelemetry (com prefixo VITE_)
  OTEL_EXPORTER_OTLP_ENDPOINT:
    import.meta.env.VITE_OTEL_EXPORTER_OTLP_ENDPOINT ||
    'http://gwan.com.br:4317',
  OTEL_SERVICE_NAME:
    import.meta.env.VITE_OTEL_SERVICE_NAME || 'gwan-ia-frontend',
  OTEL_SERVICE_VERSION: import.meta.env.VITE_OTEL_SERVICE_VERSION || '1.1.0',
  OTEL_RESOURCE_ATTRIBUTES:
    import.meta.env.VITE_OTEL_RESOURCE_ATTRIBUTES ||
    'service.name=gwan-ia-frontend,service.version=1.1.0',
};

export default env;
