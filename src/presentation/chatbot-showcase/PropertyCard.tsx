import React from 'react';
import { MapPin, Home, Bed, Bath, Car, ExternalLink } from 'lucide-react';
import type { PropertyItem } from '../../domain/chat/types';

interface PropertyCardProps {
  property: PropertyItem;
  onPropertyClick?: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPropertyClick,
}) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatPurpose = (purpose: string): string => {
    const purposeMap: Record<string, string> = {
      RENT: 'Aluguel',
      SALE: 'Venda',
      RENT_AND_SALE: 'Aluguel e Venda',
    };
    return purposeMap[purpose] || purpose;
  };

  const formatAmenity = (amenity: string): string => {
    const amenityMap: Record<string, string> = {
      hasPool: '🏊 Piscina',
      hasGarden: '🌳 Jardim',
      hasGourmetArea: '🍖 Área Gourmet',
      hasJacuzzi: '💆 Hidromassagem',
      oceanFront: '🌊 Frente Mar',
      furnished: '🛋️ Mobiliado',
    };
    return amenityMap[amenity] || amenity;
  };

  // Construir link do imóvel: sempre usar o padrão https://imoveis.gwan.com.br/property/{id}
  const buildPropertyLink = (): string | null => {
    if (property.id) {
      return `https://imoveis.gwan.com.br/property/${property.id}`;
    }
    return null;
  };

  const handleClick = () => {
    const link = buildPropertyLink();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else if (onPropertyClick) {
      onPropertyClick(property.id);
    }
  };

  const hasLink = !!buildPropertyLink();

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
      {property.coverImageUrl && (
        <img
          src={property.coverImageUrl}
          alt={property.title}
          className="w-full h-32 object-cover"
        />
      )}
      <div className="p-3">
        <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
          {property.title}
        </h4>

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            {property.type}
          </span>
          <span className="text-xs text-gray-600">{formatPurpose(property.purpose)}</span>
        </div>

        <div className="text-lg font-bold text-gray-900 mb-2">
          {formatPrice(property.price)}
        </div>

        <div className="space-y-1 mb-2">
          <div className="flex items-center text-gray-600 text-xs">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">
              {property.neighborhood}, {property.city}
            </span>
          </div>
          {property.area && (
            <div className="flex items-center text-gray-600 text-xs">
              <Home className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>{property.area} m²</span>
            </div>
          )}
          {property.bedrooms !== null && property.bedrooms !== undefined && (
            <div className="flex items-center text-gray-600 text-xs">
              <Bed className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>{property.bedrooms} quarto{property.bedrooms !== 1 ? 's' : ''}</span>
            </div>
          )}
          {property.bathrooms !== null && property.bathrooms !== undefined && (
            <div className="flex items-center text-gray-600 text-xs">
              <Bath className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>
                {property.bathrooms} banheiro{property.bathrooms !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          {property.garageSpaces !== null && property.garageSpaces !== undefined && (
            <div className="flex items-center text-gray-600 text-xs">
              <Car className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>
                {property.garageSpaces} vaga{property.garageSpaces !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {property.amenities.map((amenity, index) => (
              <span
                key={index}
                className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
              >
                {formatAmenity(amenity)}
              </span>
            ))}
          </div>
        )}

        {hasLink && (
          <div className="mt-2 flex items-center text-blue-600 text-xs font-medium">
            <ExternalLink className="h-3 w-3 mr-1" />
            <span>Ver detalhes do imóvel</span>
          </div>
        )}
      </div>
    </div>
  );
};

