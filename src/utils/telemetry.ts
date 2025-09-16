// src/utils/telemetry.ts
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { trace } from '@opentelemetry/api';
import env from '../config/env';

// Configurar o provedor de traces com tratamento de erro
let provider: WebTracerProvider;
let isTelemetryEnabled = false;

try {
  provider = new WebTracerProvider();

  // Configurar exportador OTLP para Jaeger
  const otlpExporter = new OTLPTraceExporter({
    url: env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://gwan.com.br:4318/v1/traces',
    headers: {},
  });

  // Tentar adicionar processador de spans de forma segura
  const spanProcessor = new SimpleSpanProcessor(otlpExporter);

  // Verificar se o método existe antes de chamar
  if (typeof (provider as any).addSpanProcessor === 'function') {
    (provider as any).addSpanProcessor(spanProcessor);
    isTelemetryEnabled = true;
  } else {
    console.warn('⚠️ addSpanProcessor não disponível no WebTracerProvider');
    isTelemetryEnabled = false;
  }

  // Registrar o provedor
  provider.register();
} catch (error) {
  console.error('❌ Erro ao configurar OpenTelemetry:', error);
  isTelemetryEnabled = false;
  // Criar um provider mock para evitar erros
  provider = new WebTracerProvider();
}

// Registrar instrumentações automáticas com tratamento de erro
try {
  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation(),
      new XMLHttpRequestInstrumentation(),
    ],
  });
  console.log('✅ Instrumentações OpenTelemetry registradas');
} catch (error) {
  console.warn('⚠️ Erro ao registrar instrumentações:', error);
}

// Obter tracer
export const tracer = trace.getTracer('gwan-ia-frontend');

// Função para criar spans personalizados
export const createSpan = (
  name: string,
  attributes?: Record<string, string | number | boolean>
) => {
  const span = tracer.startSpan(name);
  if (attributes) {
    span.setAttributes(attributes);
  }
  return span;
};

// Função para executar código dentro de um span
export const withSpan = <T>(
  name: string,
  fn: (span: any) => T,
  attributes?: Record<string, string | number | boolean>
): T => {
  const span = createSpan(name, attributes);
  try {
    const result = fn(span);
    span.setStatus({ code: 1 }); // OK
    return result;
  } catch (error) {
    span.setStatus({ code: 2, message: (error as Error).message }); // ERROR
    span.recordException(error as Error);
    throw error;
  } finally {
    span.end();
  }
};

// Função para adicionar eventos ao span atual
export const addSpanEvent = (
  name: string,
  attributes?: Record<string, string | number | boolean>
) => {
  const activeSpan = trace.getActiveSpan();
  if (activeSpan) {
    activeSpan.addEvent(name, attributes);
  }
};

// Função para adicionar atributos ao span atual
export const addSpanAttributes = (
  attributes: Record<string, string | number | boolean>
) => {
  const activeSpan = trace.getActiveSpan();
  if (activeSpan) {
    activeSpan.setAttributes(attributes);
  }
};

// Função para obter trace ID atual
export const getCurrentTraceId = (): string | undefined => {
  const activeSpan = trace.getActiveSpan();
  return activeSpan?.spanContext().traceId;
};

// Função para obter span ID atual
export const getCurrentSpanId = (): string | undefined => {
  const activeSpan = trace.getActiveSpan();
  return activeSpan?.spanContext().spanId;
};

// Função para verificar se telemetria está funcionando
export const isTelemetryWorking = (): boolean => {
  return isTelemetryEnabled;
};

// Função para obter status da telemetria
export const getTelemetryStatus = () => {
  return {
    enabled: isTelemetryEnabled,
    provider: provider ? 'WebTracerProvider' : 'none',
    endpoint:
      env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://gwan.com.br:4318/v1/traces',
  };
};

// Inicializar telemetria
export const initializeTelemetry = () => {
  if (isTelemetryEnabled) {
    console.log('🔍 OpenTelemetry inicializado para Gwan IA');
    console.log(
      '📊 Enviando traces para:',
      env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://gwan.com.br:4318/v1/traces'
    );

    // Criar span de inicialização
    try {
      const initSpan = createSpan('app-initialization', {
        'app.name': 'gwan-ia-frontend',
        'app.version': env.APP_VERSION || '1.0.0',
        'app.environment': env.NODE_ENV || 'development',
      });

      initSpan.end();
    } catch (error) {
      console.warn('⚠️ Erro ao criar span de inicialização:', error);
    }
  } else {
    console.warn(
      '⚠️ OpenTelemetry desabilitado - funcionando em modo limitado'
    );
    console.log('📊 Logs estruturados ainda funcionam normalmente');
  }
};

export default {
  tracer,
  createSpan,
  withSpan,
  addSpanEvent,
  addSpanAttributes,
  getCurrentTraceId,
  getCurrentSpanId,
  initializeTelemetry,
  isTelemetryWorking,
  getTelemetryStatus,
};
