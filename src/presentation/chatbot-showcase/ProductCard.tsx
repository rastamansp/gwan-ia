import React from 'react';
import { Star, Package, ExternalLink, Tag } from 'lucide-react';
import type { ProductItem } from '../../domain/chat/types';

interface ProductCardProps {
  product: ProductItem;
  onProductClick?: (productId: number | string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
}) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleClick = () => {
    if (product.url) {
      window.open(product.url, '_blank', 'noopener,noreferrer');
    } else if (onProductClick) {
      onProductClick(product.id);
    }
  };

  const hasLink = !!product.url;
  const hasDiscount = product.promotionalPrice && product.promotionalPrice < product.originalPrice;

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
      {product.realImage && (
        <div className="relative">
          <img
            src={product.realImage}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
          {hasDiscount && product.discountPercentage && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discountPercentage}%
            </div>
          )}
          {product.isFeatured && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Destaque
            </div>
          )}
        </div>
      )}

      <div className="p-3">
        <div className="flex items-start justify-between mb-1">
          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">
            {product.name}
          </h4>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          {product.subcategory && (
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              {product.subcategory}
            </span>
          )}
        </div>

        <div className="mb-2">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.promotionalPrice!)}
              </span>
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
          ) : (
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(product.originalPrice)}
            </div>
          )}
        </div>

        {product.description && (
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          {product.stock !== undefined && (
            <div className="flex items-center">
              <Package className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.stock > 0 ? `${product.stock} em estoque` : 'Sem estoque'}
              </span>
            </div>
          )}
          {product.averageRating !== undefined && product.totalReviews !== undefined && (
            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{product.averageRating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">
                ({product.totalReviews})
              </span>
            </div>
          )}
        </div>

        {product.code && (
          <div className="text-xs text-gray-500 mb-2">
            <span className="flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              Código: {product.code}
            </span>
          </div>
        )}

        {hasLink && (
          <div className="mt-2 flex items-center text-blue-600 text-xs font-medium">
            <ExternalLink className="h-3 w-3 mr-1" />
            <span>Ver detalhes do produto</span>
          </div>
        )}
      </div>
    </div>
  );
};

