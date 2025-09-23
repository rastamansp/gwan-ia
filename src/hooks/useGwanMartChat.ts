import { useState, useCallback } from 'react';
import env from '../config/env';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useGwanMartChat = (endpoint?: string) => {
  const apiEndpoint = endpoint || env.VITE_GWAN_MART_AI_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(
    `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  const [userId] = useState(
    `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMessage: Message = {
        id: `user_${Date.now()}`,
        text: text.trim(),
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: text.trim(),
            sessionId: sessionId,
            userId: userId,
          }),
        });

        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }

        const data = await response.json();

        const botMessage: Message = {
          id: `bot_${Date.now()}`,
          text:
            data.response ||
            data.message ||
            'Desculpe, não consegui processar sua mensagem.',
          isUser: false,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);

        const errorMessage: Message = {
          id: `error_${Date.now()}`,
          text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
          isUser: false,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, userId, apiEndpoint]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isOpen,
    messages,
    isLoading,
    sessionId,
    userId,
    toggleChat,
    openChat,
    closeChat,
    sendMessage,
    clearMessages,
  };
};
