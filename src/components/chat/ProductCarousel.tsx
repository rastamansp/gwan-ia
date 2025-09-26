import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 1; // Mostrar 1 produto por vez
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    setCurrentIndex(prev => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentProducts = () => {
    const start = currentIndex * itemsPerPage;
    const end = start + itemsPerPage;
    return products.slice(start, end);
  };

  if (products.length === 0) return null;

  return (
    <div className="mt-4 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-800">
          Produtos Encontrados ({products.length})
        </h4>
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              disabled={totalPages <= 1}
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span className="text-xs text-gray-500">
              {currentIndex + 1} de {totalPages}
            </span>
            <button
              onClick={nextPage}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              disabled={totalPages <= 1}
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {getCurrentProducts().map(product => (
          <Link
            key={product.id}
            to={`/gwan-mart/product/${product.code}`}
            className="block bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <div className="space-y-2">
              {/* Similaridade */}
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {`${(product.similarity * 100).toFixed(1)}% similar`}
                </span>
                <span className="text-xs text-gray-500">
                  {product.category}
                </span>
              </div>

              {/* Nome do produto */}
              <h5 className="font-medium text-sm text-gray-900 line-clamp-2">
                {product.name}
              </h5>

              {/* Imagem do produto */}
              {(product.image || product.thumbnail) && (
                <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.image || product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Código */}
              <p className="text-xs text-gray-500">Código: {product.code}</p>

              {/* Preço */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  {product.formattedPrice}
                </span>
              </div>

              {/* Botão de ação */}
              <div className="pt-2">
                <span className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  Ver detalhes →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Indicadores de página */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-3 space-x-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
