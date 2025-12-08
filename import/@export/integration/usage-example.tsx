/**
 * Exemplo completo de uso do test-chatbot
 * 
 * Este arquivo mostra como integrar o test-chatbot em uma aplicação React
 */

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { TestChatbotPage } from '../pages/TestChatbot.page'
import { ChatRepository } from '../repositories/ChatRepository'
import '../styles/chatbot-styles.css'

// 1. Configurar o cliente HTTP
const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// 2. Configurar interceptors (opcional)
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 3. Criar instâncias necessárias
const chatRepository = new ChatRepository(httpClient)

// 4. Componente principal da aplicação
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route 
          path="/test-chatbot" 
          element={<TestChatbotPage chatRepository={chatRepository} />} 
        />
        {/* Outras rotas */}
      </Routes>
    </>
  )
}

export default App

/**
 * Alternativa: Usar componentes individuais
 */
import { PhoneMockup } from '../components/chatbot-showcase/PhoneMockup'
import { ChatInterface } from '../components/chatbot-showcase/ChatInterface'

function MyCustomComponent() {
  const chatRepository = new ChatRepository(httpClient)
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Meu Chatbot Personalizado</h1>
      <div className="flex justify-center">
        <PhoneMockup>
          <ChatInterface 
            chatRepository={chatRepository}
            headerName="Meu Assistente"
            headerAvatar="🤖"
          />
        </PhoneMockup>
      </div>
    </div>
  )
}

