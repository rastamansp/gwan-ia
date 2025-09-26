import { useState, useCallback } from 'react';
import env from '../config/env';

interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
  category: string;
  similarity: number;
  formattedPrice: string;
  image?: string;
  thumbnail?: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
  products?: Product[];
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

        // Transformar produtos da API para o formato esperado
        const transformProducts = (apiProducts: any[]): Product[] => {
          if (!apiProducts || !Array.isArray(apiProducts)) return [];

          return apiProducts.map((item: any) => {
            const metadata = item.metadata || {};
            const price = parseFloat(
              metadata.promotionalPrice || metadata.originalPrice || '0'
            );

            return {
              id: item.productId || item.id,
              name: item.productName || item.name,
              code: item.productCode || item.code,
              price: price,
              category: metadata.category || item.category || '',
              similarity: item.similarity || 0,
              formattedPrice: `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
              image: metadata.realImage || item.image,
              thumbnail: metadata.thumbnail || item.thumbnail,
            };
          });
        };

        const botMessage: Message = {
          id: `bot_${Date.now()}`,
          text:
            data.response ||
            data.message ||
            'Desculpe, não consegui processar sua mensagem.',
          isUser: false,
          timestamp: new Date(),
          suggestions: data.suggestions || undefined,
          products: data.data?.results
            ? transformProducts(data.data.results)
            : undefined,
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
