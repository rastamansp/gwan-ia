import axios, { AxiosInstance } from 'axios'
import { ChatRepository } from '../repositories/ChatRepository'
import { IChatRepository } from '../repositories/IChatRepository'

/**
 * Exemplo de container de injeção de dependências
 * 
 * Este exemplo mostra como configurar as dependências necessárias
 * para o funcionamento do chatbot.
 */

interface ChatContainer {
  httpClient: AxiosInstance
  chatRepository: IChatRepository
}

export const createChatContainer = (baseURL: string): ChatContainer => {
  // Criar cliente HTTP
  const httpClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Configurar interceptors (opcional)
  httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Criar repository
  const chatRepository = new ChatRepository(httpClient)

  return {
    httpClient,
    chatRepository,
  }
}

// Exemplo de uso:
// const container = createChatContainer('http://localhost:3001/api')
// 
// No componente:
// <TestChatbotPage chatRepository={container.chatRepository} />

