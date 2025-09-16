// src/types/telemetry.ts

export interface TelemetrySpan {
  setAttributes(attributes: Record<string, string | number | boolean>): void;
  addEvent(
    name: string,
    attributes?: Record<string, string | number | boolean>
  ): void;
  setStatus(status: { code: number; message?: string }): void;
  recordException(exception: Error): void;
  end(): void;
}

export interface TelemetryOptions {
  componentName: string;
  trackPageViews?: boolean;
  trackUserInteractions?: boolean;
  trackPerformance?: boolean;
}

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
  metadata?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}
