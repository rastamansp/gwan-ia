import { useState, useCallback } from 'react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export const useChat = (endpoint: string) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const openChat = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: text.trim(),
          sessionId: sessionId
        })
      })

      if (!response.ok) {
        throw new Error('Erro na resposta da API')
      }

      const data = await response.json()
      
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        text: data.output || 'Desculpe, não consegui processar sua mensagem.',
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [sessionId, endpoint])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    isOpen,
    messages,
    isLoading,
    sessionId,
    toggleChat,
    openChat,
    closeChat,
    sendMessage,
    clearMessages
  }
}
