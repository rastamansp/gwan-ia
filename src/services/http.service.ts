import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '../config/env';
import { SessionService } from './session.service';
import { logger } from '../utils/logger';
import { withSpan, addSpanAttributes } from '../utils/telemetry';

export class HttpService {
  private static instance: HttpService;
  private readonly axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: env.API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para requisições
    this.axiosInstance.interceptors.request.use(
      config => {
        // Adicionar token de autenticação se disponível
        const sessionService = SessionService.getInstance();
        const token = sessionService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log estruturado da requisição
        logger.httpRequest(
          config.method?.toUpperCase() || 'UNKNOWN',
          config.url || 'unknown',
          {
            baseURL: config.baseURL,
            timeout: config.timeout,
            hasAuth: !!token,
          }
        );

        // Adicionar atributos ao span atual
        addSpanAttributes({
          'http.method': config.method?.toUpperCase() || 'UNKNOWN',
          'http.url': config.url || 'unknown',
          'http.request.size': JSON.stringify(config.data || {}).length,
        });

        return config;
      },
      error => {
        logger.error('Request error', error, {
          component: 'HttpService',
          action: 'request_interceptor',
        });
        return Promise.reject(error);
      }
    );

    // Interceptor para respostas
    this.axiosInstance.interceptors.response.use(
      response => {
        // Log estruturado da resposta
        logger.httpResponse(
          response.config.method?.toUpperCase() || 'UNKNOWN',
          response.config.url || 'unknown',
          response.status,
          {
            responseTime: Date.now() - Date.now(), // Simplified for now
            responseSize: JSON.stringify(response.data || {}).length,
            statusText: response.statusText,
          }
        );

        // Adicionar atributos ao span atual
        addSpanAttributes({
          'http.status_code': response.status,
          'http.status_text': response.statusText,
          'http.response.size': JSON.stringify(response.data || {}).length,
        });

        return response;
      },
      error => {
        const status = error.response?.status || 0;
        const url = error.config?.url || 'unknown';
        const method = error.config?.method?.toUpperCase() || 'UNKNOWN';

        // Log estruturado do erro
        logger.error(
          `HTTP ${method} ${url} failed with status ${status}`,
          error,
          {
            component: 'HttpService',
            action: 'response_error',
            method,
            url,
            status,
            statusText: error.response?.statusText,
            responseData: error.response?.data,
          }
        );

        // Adicionar atributos de erro ao span atual
        addSpanAttributes({
          'http.status_code': status,
          error: true,
          'error.message': error.message,
        });

        // Se receber 401 (Unauthorized), fazer logout automático
        if (status === 401) {
          logger.authAction('token_expired', {
            component: 'HttpService',
            action: 'auto_logout',
            reason: 'unauthorized_response',
          });

          const sessionService = SessionService.getInstance();
          sessionService.clearSession();

          // Redirecionar para login se estiver em uma página protegida
          if (window.location.pathname !== '/auth') {
            window.location.href = '/auth';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  public async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return withSpan(
      `HTTP GET ${url}`,
      span => {
        span.setAttributes({
          'http.method': 'GET',
          'http.url': url,
          'http.route': url,
        });
        return this.axiosInstance.get<T>(url, config);
      },
      {
        'http.method': 'GET',
        'http.url': url,
      }
    );
  }

  public async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return withSpan(
      `HTTP POST ${url}`,
      span => {
        span.setAttributes({
          'http.method': 'POST',
          'http.url': url,
          'http.route': url,
          'http.request.body.size': JSON.stringify(data || {}).length,
        });
        return this.axiosInstance.post<T>(url, data, config);
      },
      {
        'http.method': 'POST',
        'http.url': url,
      }
    );
  }

  public async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return withSpan(
      `HTTP PUT ${url}`,
      span => {
        span.setAttributes({
          'http.method': 'PUT',
          'http.url': url,
          'http.route': url,
          'http.request.body.size': JSON.stringify(data || {}).length,
        });
        return this.axiosInstance.put<T>(url, data, config);
      },
      {
        'http.method': 'PUT',
        'http.url': url,
      }
    );
  }

  public async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return withSpan(
      `HTTP DELETE ${url}`,
      span => {
        span.setAttributes({
          'http.method': 'DELETE',
          'http.url': url,
          'http.route': url,
        });
        return this.axiosInstance.delete<T>(url, config);
      },
      {
        'http.method': 'DELETE',
        'http.url': url,
      }
    );
  }

  public async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return withSpan(
      `HTTP PATCH ${url}`,
      span => {
        span.setAttributes({
          'http.method': 'PATCH',
          'http.url': url,
          'http.route': url,
          'http.request.body.size': JSON.stringify(data || {}).length,
        });
        return this.axiosInstance.patch<T>(url, data, config);
      },
      {
        'http.method': 'PATCH',
        'http.url': url,
      }
    );
  }
}
