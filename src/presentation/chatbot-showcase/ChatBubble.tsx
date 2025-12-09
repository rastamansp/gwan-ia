import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { EventCard } from './EventCard';
import { PropertyCard } from './PropertyCard';
import type { EventItem, PropertyItem } from '../../domain/chat/types';

interface ChatBubbleProps {
  type: 'text' | 'image' | 'audio' | 'event_list' | 'property_list';
  content: string;
  sender: 'mentor' | 'mentee';
  timestamp: string;
  caption?: string;
  duration?: string;
  suggestions?: string[];
  events?: EventItem[];
  properties?: PropertyItem[];
  onSuggestionClick?: (suggestion: string) => void;
}

export const ChatBubble = ({
  type,
  content,
  sender,
  timestamp,
  caption,
  duration,
  suggestions,
  events,
  properties,
  onSuggestionClick,
}: ChatBubbleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isSent = sender === 'mentee';

  const bubbleClass = isSent
    ? 'bg-chat-sent ml-auto rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-sm'
    : 'bg-chat-received mr-auto rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-sm';

  // Função para renderizar markdown básico
  const formatMarkdown = (text: string, removeImages: boolean = false): string => {
    let html = text
      // Negrito **texto**
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Itálico *texto*
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Links [texto](url)
      .replace(
        /\[([^\]]+)\]\(([^\)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">$1</a>'
      )
      // Quebras de linha
      .replace(/\n/g, '<br />');

    // Remover imagens apenas se solicitado (quando há cards de eventos)
    if (removeImages) {
      html = html.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '');
    }

    return html;
  };

  if (type === 'event_list' && events && events.length > 0) {
    // Cada evento é uma mensagem separada, então sempre haverá apenas um evento
    const event = events[0];
    return (
      <div
        className={`max-w-[85%] ${isSent ? 'ml-auto' : 'mr-auto'} mb-2 animate-fade-in`}
      >
        <div className={`${bubbleClass} px-4 py-3 shadow-sm`}>
          <EventCard event={event} />
          <span className="text-xs text-gray-600 mt-2 block text-right">
            {timestamp}
          </span>
        </div>
      </div>
    );
  }

  if (type === 'property_list' && properties && properties.length > 0) {
    // Cada imóvel é uma mensagem separada, então sempre haverá apenas um imóvel
    const property = properties[0];
    return (
      <div
        className={`max-w-[85%] ${isSent ? 'ml-auto' : 'mr-auto'} mb-2 animate-fade-in`}
      >
        <div className={`${bubbleClass} px-4 py-3 shadow-sm`}>
          <PropertyCard property={property} />
          <span className="text-xs text-gray-600 mt-2 block text-right">
            {timestamp}
          </span>
        </div>
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div
        className={`max-w-[75%] ${isSent ? 'ml-auto' : 'mr-auto'} mb-2 animate-fade-in`}
      >
        <div className={`${bubbleClass} px-4 py-2 shadow-sm`}>
          <div
            className="text-gray-900 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
          />
          {suggestions && suggestions.length > 0 && !isSent && (
            <div className="mt-3 space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick?.(suggestion)}
                  className="w-full text-left bg-white/80 hover:bg-white text-gray-900 text-xs px-3 py-2 rounded-lg border border-gray-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <span className="text-xs text-gray-600 mt-1 block text-right">
            {timestamp}
          </span>
        </div>
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div
        className={`max-w-[75%] ${isSent ? 'ml-auto' : 'mr-auto'} mb-2 animate-fade-in`}
      >
        <div className={`${bubbleClass} overflow-hidden shadow-md`}>
          <img
            src={content}
            alt="Chat image"
            className="w-full h-auto"
            loading="lazy"
          />
          {caption && (
            <div className="px-4 py-2">
              <p className="text-gray-900 text-sm">{caption}</p>
              <span className="text-xs text-gray-600 mt-1 block text-right">
                {timestamp}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === 'audio') {
    return (
      <div
        className={`max-w-[75%] ${isSent ? 'ml-auto' : 'mr-auto'} mb-2 animate-fade-in`}
      >
        <div
          className={`${bubbleClass} rounded-full px-4 py-3 shadow-sm flex items-center gap-3`}
        >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-primary" />
            ) : (
              <Play className="w-4 h-4 text-primary ml-0.5" />
            )}
          </button>
          <div className="flex-1">
            <div className="h-6 flex items-center gap-0.5">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full transition-all"
                  style={{
                    height: `${Math.random() * 100}%`,
                    opacity: isPlaying ? 0.8 : 0.4,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-end">
            <span className="text-xs text-gray-600">{duration}</span>
            <span className="text-xs text-gray-600">{timestamp}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

