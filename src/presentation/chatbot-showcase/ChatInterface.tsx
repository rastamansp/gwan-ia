import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { ChatBubble } from './ChatBubble';
import { WhatsAppHeader } from './WhatsAppHeader';
import chatData from '../../data/chat/chatData.json';
import { toast } from 'react-hot-toast';
import { IChatRepository } from '../../domain/chat/IChatRepository';
import type { EventItem, PropertyItem, ConvertedMessage } from '../../domain/chat/types';

interface JourneyMessage {
  id: number;
  sender: 'mentor' | 'mentee';
  type: 'text' | 'image' | 'audio' | 'event_list' | 'property_list';
  content: string;
  timestamp: string;
  caption?: string;
  duration?: string;
  suggestions?: string[];
  events?: EventItem[];
  properties?: PropertyItem[];
}

export interface ChatData {
  conversation: {
    participants: {
      mentor: {
        name: string;
        avatar: string;
        role: string;
      };
      mentee: {
        name: string;
        avatar: string;
        role: string;
      };
    };
    messages: JourneyMessage[];
  };
}

interface ChatInterfaceProps {
  journeyMessages?: ConvertedMessage[];
  headerName?: string;
  headerAvatar?: string;
  chatRepository: IChatRepository;
  defaultChatData?: ChatData;
}

export const ChatInterface = ({
  journeyMessages,
  headerName,
  headerAvatar,
  chatRepository,
  defaultChatData,
}: ChatInterfaceProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<JourneyMessage[]>([]);
  const chatDataToUse = defaultChatData || chatData;
  const { conversation } = chatDataToUse;
  const [visibleMessagesCount, setVisibleMessagesCount] = useState(0);
  const messagesKeyRef = useRef<string>('');
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [realTimeMessages, setRealTimeMessages] = useState<JourneyMessage[]>([]);

  // Converter ConvertedMessage[] para JourneyMessage[] se necessário
  const convertedJourneyMessages: JourneyMessage[] | undefined = journeyMessages
    ? journeyMessages.map((msg) => ({
        id: msg.id,
        sender: msg.sender,
        type: msg.type,
        content: msg.content,
        timestamp: msg.timestamp,
        caption: msg.caption,
        duration: msg.duration,
        suggestions: msg.suggestions,
        events: msg.events,
      }))
    : undefined;

  // Se há journeyMessages, usa elas; senão, usa realTimeMessages se existirem, senão usa as mensagens padrão
  const allMessages: JourneyMessage[] =
    convertedJourneyMessages ||
    (realTimeMessages.length > 0
      ? realTimeMessages
      : (conversation.messages as JourneyMessage[]));
  const mentorName =
    headerName || conversation.participants.mentor.name;
  const mentorAvatar =
    headerAvatar || conversation.participants.mentor.avatar;
  const isJourneyMode = !!convertedJourneyMessages;

  // Create a unique key for the current messages set
  const messagesKey = useMemo(() => {
    return allMessages
      .map((m) => `${m.id}-${m.content.substring(0, 20)}`)
      .join('|');
  }, [allMessages]);

  // Update messages ref when messages change
  useEffect(() => {
    messagesRef.current = allMessages as JourneyMessage[];
  }, [allMessages]);

  // Reset visible messages when messages change (apenas em modo jornada)
  useEffect(() => {
    if (isJourneyMode && messagesKeyRef.current !== messagesKey) {
      messagesKeyRef.current = messagesKey;
      setVisibleMessagesCount(0);
    } else if (!isJourneyMode) {
      // Em modo real-time, mostra todas as mensagens imediatamente
      setVisibleMessagesCount(allMessages.length);
    }
  }, [messagesKey, isJourneyMode, allMessages.length]);

  // Animate messages appearing one by one (apenas em modo jornada)
  useEffect(() => {
    if (!isJourneyMode) return;

    const currentMessages = messagesRef.current;
    if (visibleMessagesCount < currentMessages.length) {
      const nextMessage = currentMessages[visibleMessagesCount];
      // Mentor messages take longer to "type", user messages are faster
      const delay = nextMessage.sender === 'mentor' ? 1500 : 800;
      const timer = setTimeout(() => {
        setVisibleMessagesCount((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [visibleMessagesCount, isJourneyMode]);

  // Auto-scroll when new message appears
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [visibleMessagesCount, allMessages.length]);

  const visibleMessages = isJourneyMode
    ? allMessages.slice(0, visibleMessagesCount)
    : allMessages;

  const handleSendMessage = useCallback(
    async (e: React.FormEvent, messageText?: string) => {
      e.preventDefault();
      const textToSend = messageText || inputValue.trim();
      if (!textToSend || isSending) return;

      const userMessageText = textToSend;
      setInputValue('');
      setIsSending(true);

      // Adicionar mensagem do usuário imediatamente
      const userMessage: JourneyMessage = {
        id: Date.now(),
        sender: 'mentee',
        type: 'text',
        content: userMessageText,
        timestamp: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setRealTimeMessages((prev) => {
        const newMessages = [...prev, userMessage];
        setVisibleMessagesCount(newMessages.length);
        return newMessages;
      });

      try {
        // Enviar para o backend
        const response = await chatRepository.sendMessage({
          message: userMessageText,
        });

        // Usar resposta formatada se disponível, senão usar answer
        const suggestions = response.formattedResponse?.data?.suggestions;
        const responseType = response.formattedResponse?.data?.type;
        // Usar rawData se disponível, senão usar items
        const events = (response.formattedResponse?.data?.rawData ||
          response.formattedResponse?.data?.items) as EventItem[] | undefined;
        const properties = (response.formattedResponse?.data?.rawData ||
          response.formattedResponse?.data?.items) as PropertyItem[] | undefined;

        // Usar o answer completo sem processamento
        const answerText =
          response.formattedResponse?.answer || response.answer;

        // Se for lista de imóveis, criar múltiplas mensagens
        if (responseType === 'property_list' && properties && properties.length > 0) {
          const newMessages: JourneyMessage[] = [];

          // Primeira mensagem: texto introdutório (opcional, pode ser vazio se não houver)
          if (answerText && answerText.trim()) {
            const introMessage: JourneyMessage = {
              id: Date.now() + 1,
              sender: 'mentor',
              type: 'text',
              content: answerText,
              timestamp: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
            };
            newMessages.push(introMessage);
          }

          // Uma mensagem para cada imóvel
          properties.forEach((property, index) => {
            const propertyMessage: JourneyMessage = {
              id: Date.now() + 2 + index,
              sender: 'mentor',
              type: 'property_list',
              content: '',
              timestamp: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              properties: [property], // Apenas um imóvel por mensagem
            };
            newMessages.push(propertyMessage);
          });

          // Mensagem final: sugestões (se houver)
          if (suggestions && suggestions.length > 0) {
            const suggestionsMessage: JourneyMessage = {
              id: Date.now() + 2 + properties.length,
              sender: 'mentor',
              type: 'text',
              content: '',
              timestamp: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              suggestions: suggestions,
            };
            newMessages.push(suggestionsMessage);
          }

          setRealTimeMessages((prev) => {
            const updatedMessages = [...prev, ...newMessages];
            setVisibleMessagesCount(updatedMessages.length);
            return updatedMessages;
          });
        }
        // Se for lista de eventos, criar múltiplas mensagens
        else if (responseType === 'event_list' && events && events.length > 0) {
          const newMessages: JourneyMessage[] = [];

          // Primeira mensagem: texto introdutório
          const introMessage: JourneyMessage = {
            id: Date.now() + 1,
            sender: 'mentor',
            type: 'text',
            content: 'Aqui estão alguns eventos disponíveis:',
            timestamp: new Date().toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          newMessages.push(introMessage);

          // Uma mensagem para cada evento
          events.forEach((event, index) => {
            const eventMessage: JourneyMessage = {
              id: Date.now() + 2 + index,
              sender: 'mentor',
              type: 'event_list',
              content: '',
              timestamp: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              events: [event], // Apenas um evento por mensagem
            };
            newMessages.push(eventMessage);
          });

          // Mensagem final: texto de encerramento
          const outroMessage: JourneyMessage = {
            id: Date.now() + 2 + events.length,
            sender: 'mentor',
            type: 'text',
            content:
              'Se precisar de mais informações sobre algum evento específico, é só avisar!',
            timestamp: new Date().toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          newMessages.push(outroMessage);

          // Última mensagem: sugestões (se houver)
          if (suggestions && suggestions.length > 0) {
            const suggestionsMessage: JourneyMessage = {
              id: Date.now() + 3 + events.length,
              sender: 'mentor',
              type: 'text',
              content: '',
              timestamp: new Date().toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              }),
              suggestions: suggestions,
            };
            newMessages.push(suggestionsMessage);
          }

          setRealTimeMessages((prev) => {
            const updatedMessages = [...prev, ...newMessages];
            setVisibleMessagesCount(updatedMessages.length);
            return updatedMessages;
          });
        } else {
          // Mensagem normal (não é lista de eventos)
          const botMessage: JourneyMessage = {
            id: Date.now() + 1,
            sender: 'mentor',
            type: 'text',
            content: answerText,
            timestamp: new Date().toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            suggestions: suggestions,
          };

          setRealTimeMessages((prev) => {
            const newMessages = [...prev, botMessage];
            setVisibleMessagesCount(newMessages.length);
            return newMessages;
          });
        }
      } catch (err) {
        toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');

        // Adicionar mensagem de erro do bot
        const errorBotMessage: JourneyMessage = {
          id: Date.now() + 1,
          sender: 'mentor',
          type: 'text',
          content:
            'Desculpe, não consegui processar sua mensagem. Por favor, tente novamente.',
          timestamp: new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setRealTimeMessages((prev) => {
          const newMessages = [...prev, errorBotMessage];
          setVisibleMessagesCount(newMessages.length);
          return newMessages;
        });
      } finally {
        setIsSending(false);
      }
    },
    [inputValue, isSending, chatRepository]
  );

  // Reset quando journeyMessages muda
  useEffect(() => {
    if (convertedJourneyMessages) {
      setRealTimeMessages([]);
    }
  }, [convertedJourneyMessages]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <WhatsAppHeader
        name={mentorName}
        avatar={mentorAvatar}
        status="online"
      />

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 min-h-0"
        style={{
          backgroundImage: `url("https://personalmarketingdigital.com.br/wp-content/uploads/2018/05/background-whatsapp-7.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#e5ddd5',
        }}
      >
        {visibleMessages.map((message) => (
          <ChatBubble
            key={message.id}
            type={message.type as 'text' | 'image' | 'audio' | 'event_list' | 'property_list'}
            content={message.content}
            sender={message.sender as 'mentor' | 'mentee'}
            timestamp={message.timestamp}
            caption={message.caption}
            duration={message.duration}
            suggestions={message.suggestions}
            events={message.events}
            properties={message.properties}
            onSuggestionClick={(suggestion) => {
              // Disparar envio automático da sugestão
              const syntheticEvent = {
                preventDefault: () => {},
              } as React.FormEvent;
              handleSendMessage(syntheticEvent, suggestion);
            }}
          />
        ))}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="bg-white px-4 py-3 flex items-center gap-2 border-t border-gray-200 flex-shrink-0"
      >
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Mensagem"
            className="bg-transparent text-gray-900 text-sm w-full outline-none border-0 focus:outline-none focus:ring-0 focus:border-0 placeholder:text-gray-500 appearance-none"
            disabled={isSending}
            maxLength={1000}
          />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim() || isSending}
          className="text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

