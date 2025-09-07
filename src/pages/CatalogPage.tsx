import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useProductsWithFilters } from '../hooks/useProductsWithFilters';
import { SearchParams } from '../types/search.types';
import { formatPrice } from '../utils/price';

const CatalogPage: React.FC = () => {
  const { 
    products, 
    loading, 
    error, 
    pagination, 
    categories, 
    subcategories, 
    searchProducts,
    changePage,
    changeLimit
  } = useProductsWithFilters();

  // Debug: verificar produtos renderizados
  console.log('CatalogPage - Products:', products);
  if (products.length > 0) {
    console.log('CatalogPage - First product:', products[0]);
  }

  const handleSearch = (params: SearchParams) => {
    searchProducts(params);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="mb-8 scroll-reveal">
            <h2 className="text-2xl font-semibold gradient-text mb-2">
              Catálogo Completo
            </h2>
            <p className="text-muted-foreground">
              {loading ? 'Carregando...' : `${pagination.total} produtos encontrados`}
            </p>
          </div>

          {/* Barra de pesquisa */}
          <SearchBar 
            onSearch={handleSearch}
            loading={loading}
            categories={categories}
            subcategories={subcategories}
          />

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-4 text-muted-foreground">
                Carregando produtos...
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-destructive mb-4">
                ❌ Erro ao carregar produtos
              </div>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <Link
                  key={product.id}
                  to={`/gwan-mart/product/${product.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105 overflow-hidden">
                    {/* Product Image Container */}
                    <div className="relative">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      
                      {/* Discount Badge - Top Left */}
                      {product.discountPercentage > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{product.discountPercentage}%
                        </div>
                      )}
                      
                      {/* New Badge - Top Right */}
                      <div className="absolute top-2 right-2 bg-blue-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Novo
                      </div>
                      
                      {/* Feature Badge - Bottom Right Overlay */}
                      {product.category === 'Eletrônicos' && product.subcategory === 'Smartphones' && (
                        <div className="absolute bottom-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                          CÂMERA 108MP+ VIDEO FULL HD
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      {/* Product Title */}
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name || product.description || `Produto ${product.code}`}
                      </h3>

                      {/* Price Section */}
                      <div className="flex items-center justify-between">
                        {/* Original Price */}
                        {product.discountPercentage > 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.formattedOriginalPrice || formatPrice(product.originalPrice)}
                          </span>
                        )}
                        
                        {/* Current Price */}
                        <span className="text-lg font-bold text-purple-600">
                          {product.formattedCurrentPrice || formatPrice(product.promotionalPrice || product.currentPrice)}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4 fill-current text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="text-sm font-medium text-gray-900">
                          {product.formattedRating}
                        </span>
                      </div>

                      {/* Free Shipping */}
                      <div className="flex items-center justify-end">
                        <div className="flex items-center gap-1 text-blue-400 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                            <path d="M15 18H9"></path>
                            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                            <circle cx="17" cy="18" r="2"></circle>
                            <circle cx="7" cy="18" r="2"></circle>
                          </svg>
                          <span>Frete grátis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Paginação */}
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            itemsPerPage={pagination.limit}
            onPageChange={changePage}
            onLimitChange={changeLimit}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default CatalogPage;
