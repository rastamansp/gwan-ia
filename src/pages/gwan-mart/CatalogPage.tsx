import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { useProductsWithFilters } from '../../hooks/useProductsWithFilters';
import { SearchParams } from '../../types/search.types';

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
    changeLimit,
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
              {loading
                ? 'Carregando...'
                : `${pagination.total} produtos encontrados`}
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
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105 overflow-hidden relative">
                    {/* Product Image Container */}
                    <div className="relative">
                      <img
                        src={product.thumbnail}
                        alt={
                          product.name ||
                          product.description ||
                          `Produto ${product.code}`
                        }
                        className="w-full h-48 object-cover"
                      />

                      {/* Favorite Button - Top Right */}
                      <button
                        className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          // TODO: Implementar favoritos
                        }}
                      >
                        <svg
                          className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-3">
                      {/* MAIS VENDIDO Badge */}
                      <div className="inline-block">
                        <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                          MAIS VENDIDO
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900">
                          {product.averageRating.toFixed(1) || '4.9'}
                        </span>
                        <div className="flex text-blue-500">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              className="w-3 h-3 fill-current"
                              viewBox="0 0 15 15"
                            >
                              <path d="M7.5 0L9.5 5.5L15 5.5L10.5 9L12 15L7.5 11.5L3 15L4.5 9L0 5.5L5.5 5.5L7.5 0Z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.totalReviews || '2866'})
                        </span>
                      </div>

                      {/* Price Section */}
                      <div className="space-y-1">
                        {/* Original Price */}
                        {product.discountPercentage > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            R${' '}
                            {(product.originalPrice || 0).toLocaleString(
                              'pt-BR'
                            )}
                          </div>
                        )}

                        {/* Current Price with Discount */}
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            R${' '}
                            {(
                              product.promotionalPrice ||
                              product.originalPrice ||
                              0
                            ).toLocaleString('pt-BR')}
                          </span>
                          {product.discountPercentage > 0 && (
                            <span className="text-sm font-semibold text-green-600">
                              {product.discountPercentage}% OFF
                            </span>
                          )}
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
