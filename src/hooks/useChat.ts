import { useState, useCallback } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChat = (endpoint: string) => {
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
        // Prepara o body da requisição
        const requestBody: { query: string; sessionId?: string } = {
          query: text.trim(),
        };

        // Só envia sessionId se já tiver sido retornado pelo backend
        if (sessionId) {
          requestBody.sessionId = sessionId;
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Erro na resposta da API');
        }

        const data = await response.json();

        // Se a API retornar um sessionId, armazena para usar nas próximas requisições
        // Usa função de atualização para evitar problemas de closure
        if (data.sessionId) {
          setSessionId(prevSessionId => {
            // Só atualiza se ainda não tiver um sessionId
            return prevSessionId || data.sessionId;
          });
        }

        // Prioriza markdownAnswer, depois tenta outros campos possíveis da resposta da API
        const responseText =
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
    [sessionId, endpoint]
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
