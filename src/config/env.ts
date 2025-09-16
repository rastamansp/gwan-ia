interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly VITE_LOG_LEVEL: string;
  // Variáveis de monitoramento OpenTelemetry
  readonly OTEL_EXPORTER_OTLP_ENDPOINT: string;
  readonly OTEL_SERVICE_NAME: string;
  readonly OTEL_SERVICE_VERSION: string;
  readonly OTEL_RESOURCE_ATTRIBUTES: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const env = {
  // API
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Gwan IA',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  // Environment
  NODE_ENV: import.meta.env.MODE || 'development',
  IS_DEV: import.meta.env.DEV || false,
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
  // OpenTelemetry
  OTEL_EXPORTER_OTLP_ENDPOINT:
    import.meta.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://gwan.com.br:4317',
  OTEL_SERVICE_NAME: import.meta.env.OTEL_SERVICE_NAME || 'gwan-ia-frontend',
  OTEL_SERVICE_VERSION: import.meta.env.OTEL_SERVICE_VERSION || '1.0.0',
  OTEL_RESOURCE_ATTRIBUTES:
    import.meta.env.OTEL_RESOURCE_ATTRIBUTES ||
    'service.name=gwan-ia-frontend,service.version=1.0.0',
};

export default env;
