import React from 'react';

export interface Realtor {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface Property {
  id: string;
  title: string;
  type: string;
  purpose: string;
  price: number;
  city: string;
  neighborhood: string;
  area: number;
  bedrooms: number | null;
  bathrooms: number | null;
  garageSpaces: number | null;
  amenities: string[] | { [key: string]: boolean };
  coverImageUrl: string;
  url: string;
  description?: string;
  realtor?: Realtor;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  // Normaliza amenities de objeto para array
  const normalizeAmenities = (
    amenities: string[] | { [key: string]: boolean }
  ): string[] => {
    if (Array.isArray(amenities)) {
      return amenities;
    }
    // Se for objeto, converte chaves com valor true em array
    return Object.keys(amenities).filter(key => amenities[key] === true);
  };

  const amenitiesList = normalizeAmenities(property.amenities);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      APARTAMENTO: 'Apartamento',
      CASA: 'Casa',
      TERRENO: 'Terreno',
    };
    return types[type] || type;
  };

  const getPurposeLabel = (purpose: string) => {
    const purposes: { [key: string]: string } = {
      RENT: 'Aluguel',
      SALE: 'Venda',
    };
    return purposes[purpose] || purpose;
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: { [key: string]: string } = {
      hasPool: '🏊',
      hasJacuzzi: '💆',
      oceanFront: '🌊',
      hasGarden: '🌳',
      hasGourmetArea: '🍖',
      furnished: '🛋️',
    };
    return icons[amenity] || '✨';
  };

  const getAmenityLabel = (amenity: string) => {
    const labels: { [key: string]: string } = {
      hasPool: 'Piscina',
      hasJacuzzi: 'Hidro',
      oceanFront: 'Frente Mar',
      hasGarden: 'Jardim',
      hasGourmetArea: 'Área Gourmet',
      furnished: 'Mobiliado',
    };
    return labels[amenity] || amenity;
  };

  const handleClick = () => {
    // Converte a URL para o formato correto
    let propertyUrl = property.url;
    if (propertyUrl.includes('litoralimoveis.com.br/imoveis/')) {
      const propertyId = property.id;
      propertyUrl = `https://imoveis.gwan.com.br/property/${propertyId}`;
    } else if (!propertyUrl.includes('imoveis.gwan.com.br')) {
      // Se não tiver o domínio correto, usa o ID diretamente
      propertyUrl = `https://imoveis.gwan.com.br/property/${property.id}`;
    }
    window.open(propertyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={property.coverImageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={e => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/400x300?text=Imóvel';
          }}
        />
        {/* Badges */}
        <div className="absolute top-2 left-2">
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
            {getTypeLabel(property.type)}
          </span>
        </div>
        {amenitiesList.includes('oceanFront') && (
          <div className="absolute top-2 right-2">
            <span className="bg-teal-500 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
              <span>🌊</span>
              <span>Frente Mar</span>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>
            {property.neighborhood}, {property.city}
          </span>
        </div>

        {/* Specifications */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {property.bedrooms !== null && (
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms !== null && (
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              <span>{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            <span>{property.area}m²</span>
          </div>
        </div>

        {/* Amenities */}
        {amenitiesList.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {amenitiesList.slice(0, 4).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
              >
                <span>{getAmenityIcon(amenity)}</span>
                <span>{getAmenityLabel(amenity)}</span>
              </span>
            ))}
            {amenitiesList.length > 4 && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                +{amenitiesList.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        {property.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {property.description}
          </p>
        )}

        {/* Realtor Info */}
        {property.realtor && (
          <div className="mb-3 p-2 bg-gray-50 rounded border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-1">
              👤 Corretor
            </p>
            <p className="text-xs text-gray-600">{property.realtor.name}</p>
            {property.realtor.phone && (
              <p className="text-xs text-gray-600">{property.realtor.phone}</p>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {getPurposeLabel(property.purpose)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
