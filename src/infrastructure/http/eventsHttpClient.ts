import axios, { AxiosInstance } from 'axios';
import env from '../../config/env';

/**
 * Cliente HTTP específico para a API de Events
 * Configurado conforme padrão do projeto
 */
export const createEventsHttpClient = (baseURL?: string): AxiosInstance => {
  const finalBaseURL =
    baseURL ||
    env.VITE_GWAN_EVENTS_CHAT_URL ||
    (env.VITE_GWAN_EVENT_URL
      ? `${env.VITE_GWAN_EVENT_URL}/api`
      : 'http://localhost:3001/api');

  const httpClient = axios.create({
    baseURL: finalBaseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 segundos para respostas do chatbot
  });

  // Interceptor para adicionar token de autenticação (opcional)
  httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Interceptor para lidar com respostas de erro
  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Limpar dados de autenticação se necessário
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirecionar para login se não estiver já na página de login
        if (!window.location.pathname.includes('/auth')) {
          window.location.href = '/auth';
        }
      }
      return Promise.reject(error);
    }
  );

  return httpClient;
};

