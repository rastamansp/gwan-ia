import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { useProductsWithFilters } from '../../hooks/useProductsWithFilters';
import { SearchParams } from '../../types/search.types';
import { useToast } from '../../hooks/useToast';
import ToastContainer from '../../components/ui/ToastContainer';
import GwanMartChatWidget from '../../components/chat/GwanMartChatWidget';
import { useGwanMartChat } from '../../hooks/useGwanMartChat';
import env from '../../config/env';

interface AIProduct {
  id: number;
  name: string;
  code: string;
  description?: string;
  category: string;
  subcategory: string;
  costPrice: number;
  originalPrice: number;
  promotionalPrice?: number;
  stock: number;
  supplier: string;
  gtinEan: string;
  gtinEanPackage: string;
  supplierProductDescription: string;
  discountPercentage: number;
  averageRating: number;
  totalReviews: number;
  thumbnail: string;
  realImage: string;
  ncm: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  images: string[];
  variations?: unknown;
  similarity: number;
}

const CatalogPage: React.FC = () => {
  // Estados para busca com IA
  const [isAISearch, setIsAISearch] = useState(false);
  const [aiSearchResults, setAiSearchResults] = useState<AIProduct[]>([]);
  const [aiSearchLoading, setAiSearchLoading] = useState(false);
  const [aiSearchError, setAiSearchError] = useState<string | null>(null);

  // Estados para chat Gwan Mart
  const { isOpen, toggleChat, openChat } = useGwanMartChat();

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
      const apiUrl = env.GWAN_MART_API_URL;
      const response = await fetch(`${apiUrl}/products/search/similar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
        }),
      });

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

  const handleSearch = (params: SearchParams) => {
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold gradient-text mb-2">
                  Catálogo completo
                </h2>
              </div>
              <div className="flex gap-4 items-center mt-4 md:mt-0">
                <span className="text-sm text-muted-foreground">
                  Precisa de ajuda?
                </span>
                <button
                  onClick={openChat}
                  className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-glow-primary transition-all duration-300 flex items-center gap-2"
                >
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Falar com o Atendente
                </button>
              </div>
            </div>
            <p className="text-muted-foreground">
              {loading || aiSearchLoading
                ? 'Carregando...'
                : isAISearch
                  ? `${aiSearchResults.length} produtos similares encontrados`
                  : `${pagination.total} produtos encontrados`}
            </p>
          </div>

          {/* Barra de pesquisa */}
          <SearchBar
            onSearch={handleSearch}
            loading={loading || aiSearchLoading}
            categories={categories}
            subcategories={subcategories}
            isAISearch={isAISearch}
            onToggleAISearch={toggleSearchMode}
          />

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
                      {isAISearch &&
                        'similarity' in product &&
                        product.similarity && (
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

      {/* Gwan Mart Chat Widget */}
      <GwanMartChatWidget
        isOpen={isOpen}
        onToggle={toggleChat}
        chatbotName="Gwan Mart"
        chatbotIcon="🛒"
        chatbotColor="#10b981"
        endpoint={env.GWAN_MART_CHAT_URL}
      />
    </div>
  );
};

export default CatalogPage;
