import React from 'react';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import type { EventItem } from '../../domain/chat/types';

interface EventCardProps {
  event: EventItem;
  onEventClick?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onEventClick,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Mapear diferentes possíveis nomes de campos do backend para eventLink
  const getEventLink = (): string | undefined => {
    const eventData = event as any;
    return (
      eventData.eventLink ||
      eventData.event_link ||
      eventData.link ||
      eventData.url ||
      eventData.eventUrl
    );
  };

  // Construir link do evento: usar link do backend ou construir usando URL base + ID
  const buildEventLink = (): string | null => {
    const backendLink = getEventLink();
    if (backendLink) {
      // Se já tem link do backend, garantir que seja absoluto
      return backendLink.startsWith('http://') || backendLink.startsWith('https://')
        ? backendLink
        : `https://${backendLink}`;
    }

    // Se não tem link e tem ID, construir usando URL base + ID do evento
    if (event.id) {
      const baseUrl = window.location.origin;
      return `${baseUrl}/events/${event.id}`;
    }

    return null;
  };

  const handleClick = () => {
    const link = buildEventLink();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else if (onEventClick) {
      // Fallback: usar callback se não tiver link nem ID
      onEventClick(event.id);
    }
  };

  const hasLink = !!buildEventLink();

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all ${
        hasLink
          ? 'cursor-pointer hover:shadow-md hover:border-blue-300'
          : 'cursor-default'
      }`}
      role={hasLink ? 'button' : undefined}
      tabIndex={hasLink ? 0 : undefined}
      onKeyDown={(e) => {
        if (hasLink && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-32 object-cover"
        />
      )}
      <div className="p-3">
        <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
          {event.title}
        </h4>
        {event.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
            {event.description}
          </p>
        )}

        <div className="space-y-1">
          <div className="flex items-center text-gray-600 text-xs">
            <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">
              {formatDate(event.date)} às {formatTime(event.date)}
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-xs">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">
              {event.location}
              {event.address ? `, ${event.address}` : ''}, {event.city}
              {event.state ? ` - ${event.state}` : ''}
            </span>
          </div>
          {(event.maxCapacity !== undefined ||
            event.soldTickets !== undefined) && (
            <div className="flex items-center text-gray-600 text-xs">
              <Users className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>
                {event.soldTickets ?? 0} de {event.maxCapacity ?? 0} ingressos
                vendidos
              </span>
            </div>
          )}
        </div>

        {event.category && (
          <div className="mt-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
              {event.category}
            </span>
          </div>
        )}

        {hasLink && (
          <div className="mt-2 flex items-center text-blue-600 text-xs font-medium">
            <ExternalLink className="h-3 w-3 mr-1" />
            <span>Ver detalhes do evento</span>
          </div>
        )}
      </div>
    </div>
  );
};

