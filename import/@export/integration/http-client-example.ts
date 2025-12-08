import axios, { AxiosInstance } from 'axios'

/**
 * Exemplo de configuração do cliente HTTP para o chatbot
 * 
 * Este exemplo mostra como configurar o axios para se comunicar
 * com a API do backend do chatbot.
 */

export const createHttpClient = (baseURL: string): AxiosInstance => {
  const httpClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Interceptor para adicionar token de autenticação (opcional)
  httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Interceptor para lidar com respostas de erro
  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Limpar dados de autenticação se necessário
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        // Redirecionar para login se não estiver já na página de login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    }
  )

  return httpClient
}

// Exemplo de uso:
// const httpClient = createHttpClient('http://localhost:3001/api')
// ou
// const httpClient = createHttpClient(import.meta.env.VITE_API_URL || 'http://localhost:3001/api')

