import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { useProductsWithFilters } from '../../hooks/useProductsWithFilters';
import { SearchParams } from '../../types/search.types';
import { useToast } from '../../hooks/useToast';
import ToastContainer from '../../components/ui/ToastContainer';

const CatalogPage: React.FC = () => {
  // Estados para busca com IA
  const [isAISearch, setIsAISearch] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState<any[]>([]);
  const [aiSearchLoading, setAiSearchLoading] = useState(false);
  const [aiSearchError, setAiSearchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
  } = useProductsWithFilters({ page: 1, limit: 20 });

  const { toasts, showSuccess, showError } = useToast();

  // Função para busca com IA
  const handleAISearch = async (query: string) => {
    if (!query.trim()) return;

    setAiSearchLoading(true);
    setAiSearchError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}products/search/similar`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Erro na busca com IA');
      }

      const data = await response.json();

      if (data.status === 'success') {
        // Converter resultados da IA para o formato esperado
        const formattedResults = data.data.results.map(
          (result: {
            productId: number;
            productName: string;
            productCode: string;
            similarity: number;
            metadata: {
              price: string;
              stock: number;
              category: string;
              isActive: boolean;
              supplier: string;
              createdAt: string;
              updatedAt: string;
              isFeatured: boolean;
              subcategory: string;
            };
          }) => ({
            id: result.productId,
            name: result.productName,
            code: result.productCode,
            description: `Similaridade: ${(result.similarity * 100).toFixed(1)}%`,
            category: result.metadata.category,
            subcategory: result.metadata.subcategory,
            costPrice: 0,
            originalPrice: parseFloat(result.metadata.price),
            promotionalPrice: undefined,
            stock: result.metadata.stock,
            supplier: result.metadata.supplier,
            gtinEan: '',
            gtinEanPackage: '',
            supplierProductDescription: '',
            discountPercentage: 0,
            averageRating: 0,
            totalReviews: 0,
            thumbnail: '',
            realImage: '',
            ncm: '',
            isActive: result.metadata.isActive,
            isFeatured: result.metadata.isFeatured,
            createdAt: result.metadata.createdAt,
            updatedAt: result.metadata.updatedAt,
            images: [],
            variations: undefined,
            similarity: result.similarity, // Campo adicional para mostrar similaridade
          })
        );

        setAiSearchResults(formattedResults);
        showSuccess(
          `Busca com IA realizada! Encontrados ${formattedResults.length} produtos similares.`
        );
      } else {
        throw new Error(data.error || 'Erro na busca com IA');
      }
    } catch (error) {
      console.error('Erro na busca com IA:', error);
      setAiSearchError(
        error instanceof Error ? error.message : 'Erro na busca com IA'
      );
      showError('Erro ao realizar busca com IA. Tente novamente.');
    } finally {
      setAiSearchLoading(false);
    }
  };

  // Função para alternar entre busca normal e IA
  const toggleSearchMode = () => {
    setIsAISearch(!isAISearch);
    setAiSearchResults([]);
    setAiSearchError(null);

    if (!isAISearch) {
      showSuccess(
        'Modo de busca com IA ativado! Digite sua consulta para encontrar produtos similares.'
      );
    } else {
      showSuccess('Modo de busca normal ativado!');
    }
  };

  // Função para atualizar resultados da busca
  const handleRefreshSearch = () => {
    if (isAISearch && searchQuery.trim()) {
      handleAISearch(searchQuery.trim());
    } else {
      searchProducts({ page: 1, limit: 20, search: searchQuery });
      showSuccess('Resultados da busca atualizados!');
    }
  };

  const handleSearch = (params: SearchParams) => {
    setSearchQuery(params.search || '');
    if (isAISearch && params.search?.trim()) {
      handleAISearch(params.search.trim());
    } else {
      searchProducts(params);
    }
  };

  const handlePageChange = (page: number) => {
    changePage(page);
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
              {loading || aiSearchLoading
                ? 'Carregando...'
                : isAISearch
                  ? `${aiSearchResults.length} produtos similares encontrados`
                  : `${pagination.total} produtos encontrados`}
            </p>
          </div>

          {/* Barra de pesquisa */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              loading={loading || aiSearchLoading}
              categories={categories}
              subcategories={subcategories}
            />

            {/* Toggle para busca com IA */}
            <div className="mt-4 flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Busca Normal
                  </span>
                  <button
                    onClick={toggleSearchMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                      isAISearch ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isAISearch ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    Busca com IA
                  </span>
                </div>
              </div>

              <button
                onClick={handleRefreshSearch}
                disabled={loading || aiSearchLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                title="Buscar produtos"
              >
                <svg
                  className={`w-4 h-4 ${loading || aiSearchLoading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>
                  {loading || aiSearchLoading ? 'Buscando...' : 'Buscar'}
                </span>
              </button>
            </div>
          </div>

          {loading || aiSearchLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-4 text-muted-foreground">
                {aiSearchLoading
                  ? 'Buscando produtos similares com IA...'
                  : 'Carregando produtos...'}
              </span>
            </div>
          ) : error || aiSearchError ? (
            <div className="text-center py-16">
              <div className="text-destructive mb-4">
                ❌ Erro ao carregar produtos
              </div>
              <p className="text-muted-foreground">{aiSearchError || error}</p>
            </div>
          ) : (isAISearch ? aiSearchResults : products).length === 0 ? (
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                {isAISearch
                  ? 'Nenhum produto similar encontrado'
                  : 'Nenhum produto encontrado'}
              </div>
              <p className="text-sm text-gray-500">
                {isAISearch
                  ? 'Tente uma busca diferente ou volte para a busca normal'
                  : 'Tente ajustar os filtros ou fazer uma nova busca'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(isAISearch ? aiSearchResults : products).map(product => (
                <Link
                  key={product.id}
                  to={`/gwan-mart/product/${product.code}`}
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

                      {/* Mostrar similaridade para busca com IA */}
                      {isAISearch && product.similarity && (
                        <div className="inline-block">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {`${(product.similarity * 100).toFixed(1)}% similar`}
                          </span>
                        </div>
                      )}

                      {/* Product Title */}
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-900">
                          {Number(product.averageRating).toFixed(1) || '4.9'}
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
                        {Number(product.discountPercentage) > 0 && (
                          <div className="text-sm text-gray-500 line-through">
                            R${' '}
                            {Number(product.originalPrice || 0).toLocaleString(
                              'pt-BR'
                            )}
                          </div>
                        )}

                        {/* Current Price with Discount */}
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            R${' '}
                            {Number(
                              product.promotionalPrice ||
                                product.originalPrice ||
                                0
                            ).toLocaleString('pt-BR')}
                          </span>
                          {Number(product.discountPercentage) > 0 && (
                            <span className="text-sm font-semibold text-green-600">
                              {Number(product.discountPercentage)}% OFF
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
          {!isAISearch && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              itemsPerPage={pagination.limit}
              onPageChange={handlePageChange}
              onLimitChange={changeLimit}
              loading={loading}
            />
          )}
        </div>
      </main>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} />
    </div>
  );
};

export default CatalogPage;
