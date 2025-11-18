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
  const apiEndpoint = endpoint || env.GWAN_MART_CHAT_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

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
        // Prepara o body da requisição - formato similar ao useChat
        const requestBody: { message: string; sessionId?: string } = {
          message: text.trim(),
        };

        // Só envia sessionId se já tiver sido retornado pelo backend ou se for a primeira mensagem
        if (sessionId) {
          requestBody.sessionId = sessionId;
        }

        console.log('Enviando mensagem para:', apiEndpoint);
        console.log('Body da requisição:', requestBody);

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log('Response status:', response.status);
        console.log(
          'Response headers:',
          Object.fromEntries(response.headers.entries())
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro na resposta:', errorText);
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);

        // Se a API retornar um sessionId, armazena para usar nas próximas requisições
        if (data.sessionId) {
          setSessionId(prevSessionId => {
            // Só atualiza se ainda não tiver um sessionId
            return prevSessionId || data.sessionId;
          });
        }

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

        // Prioriza diferentes campos possíveis da resposta da API
        const responseText =
          data.formattedResponse?.answer ||
          data.markdownAnswer ||
          data.answer ||
          data.response ||
          data.message ||
          data.output ||
          data.text ||
          'Desculpe, não consegui processar sua mensagem.';

        const botMessage: Message = {
          id: `bot_${Date.now()}`,
          text: responseText,
          isUser: false,
          timestamp: new Date(),
          suggestions:
            data.suggestions ||
            data.formattedResponse?.data?.suggestions ||
            undefined,
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
    [sessionId, apiEndpoint]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isOpen,
    messages,
    isLoading,
    sessionId,
    toggleChat,
    openChat,
    closeChat,
    sendMessage,
    clearMessages,
  };
};
