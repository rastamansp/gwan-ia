// src/utils/logger.ts
import { getCurrentTraceId, getCurrentSpanId } from './telemetry';
import env from '../config/env';

// Tipos para logs estruturados
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  traceId?: string;
  spanId?: string;
  userId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

// Configuração do logger
class Logger {
  private isDevelopment = env.IS_DEV;
  private logLevel = env.LOG_LEVEL;

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  private formatLog(entry: LogEntry): string {
    // Em desenvolvimento, mostrar logs coloridos no console
    if (this.isDevelopment) {
      const colors = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m', // Green
        warn: '\x1b[33m', // Yellow
        error: '\x1b[31m', // Red
      };
      const reset = '\x1b[0m';

      const color = colors[entry.level] || '';
      const timestamp = new Date(entry.timestamp).toLocaleTimeString();

      let logMessage = `${color}[${timestamp}] ${entry.level.toUpperCase()}: ${entry.message}${reset}`;

      if (entry.traceId) {
        logMessage += ` ${color}(trace: ${entry.traceId})${reset}`;
      }

      if (entry.metadata && Object.keys(entry.metadata).length > 0) {
        logMessage += `\n${color}Metadata: ${JSON.stringify(entry.metadata, null, 2)}${reset}`;
      }

      if (entry.error) {
        logMessage += `\n${color}Error: ${entry.error.name}: ${entry.error.message}${reset}`;
        if (entry.error.stack) {
          logMessage += `\n${color}Stack: ${entry.error.stack}${reset}`;
        }
      }

      return logMessage;
    }

    // Em produção, sempre JSON estruturado
    return JSON.stringify(entry);
  }

  private log(
    level: LogEntry['level'],
    message: string,
    metadata?: Record<string, any>,
    error?: Error
  ) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      traceId: getCurrentTraceId(),
      spanId: getCurrentSpanId(),
      metadata,
    };

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    const formattedLog = this.formatLog(entry);

    // Usar console apropriado baseado no nível
    switch (level) {
      case 'debug':
        console.debug(formattedLog);
        break;
      case 'info':
        console.info(formattedLog);
        break;
      case 'warn':
        console.warn(formattedLog);
        break;
      case 'error':
        console.error(formattedLog);
        break;
    }
  }

  debug(message: string, metadata?: Record<string, any>) {
    this.log('debug', message, metadata);
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata);
  }

  error(message: string, error?: Error, metadata?: Record<string, any>) {
    this.log('error', message, metadata, error);
  }

  // Métodos específicos para diferentes contextos
  httpRequest(method: string, url: string, metadata?: Record<string, any>) {
    this.info(`HTTP ${method} ${url}`, {
      component: 'HttpService',
      action: 'request',
      method,
      url,
      ...metadata,
    });
  }

  httpResponse(
    method: string,
    url: string,
    status: number,
    metadata?: Record<string, any>
  ) {
    const level = status >= 400 ? 'error' : 'info';
    this.log(level, `HTTP ${method} ${url} - ${status}`, {
      component: 'HttpService',
      action: 'response',
      method,
      url,
      status,
      ...metadata,
    });
  }

  userAction(
    action: string,
    component: string,
    metadata?: Record<string, any>
  ) {
    this.info(`User action: ${action}`, {
      component,
      action,
      ...metadata,
    });
  }

  pageView(page: string, metadata?: Record<string, any>) {
    this.info(`Page view: ${page}`, {
      component: 'Router',
      action: 'page_view',
      page,
      ...metadata,
    });
  }

  componentMount(componentName: string, metadata?: Record<string, any>) {
    this.debug(`Component mounted: ${componentName}`, {
      component: componentName,
      action: 'mount',
      ...metadata,
    });
  }

  componentUnmount(componentName: string, metadata?: Record<string, any>) {
    this.debug(`Component unmounted: ${componentName}`, {
      component: componentName,
      action: 'unmount',
      ...metadata,
    });
  }

  authAction(action: string, metadata?: Record<string, any>) {
    this.info(`Auth action: ${action}`, {
      component: 'AuthService',
      action,
      ...metadata,
    });
  }

  apiCall(endpoint: string, method: string, metadata?: Record<string, any>) {
    this.info(`API call: ${method} ${endpoint}`, {
      component: 'ApiService',
      action: 'api_call',
      endpoint,
      method,
      ...metadata,
    });
  }

  performance(metric: string, value: number, metadata?: Record<string, any>) {
    this.info(`Performance metric: ${metric}`, {
      component: 'Performance',
      action: 'metric',
      metric,
      value,
      ...metadata,
    });
  }
}

// Instância singleton do logger
export const logger = new Logger();

// Função para criar logger com contexto específico
export const createContextLogger = (component: string) => ({
  debug: (message: string, metadata?: Record<string, any>) =>
    logger.debug(message, { component, ...metadata }),
  info: (message: string, metadata?: Record<string, any>) =>
    logger.info(message, { component, ...metadata }),
  warn: (message: string, metadata?: Record<string, any>) =>
    logger.warn(message, { component, ...metadata }),
  error: (message: string, error?: Error, metadata?: Record<string, any>) =>
    logger.error(message, error, { component, ...metadata }),
});

export default logger;
