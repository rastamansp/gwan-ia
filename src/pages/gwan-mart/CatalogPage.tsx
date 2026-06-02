import React, { useState } from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import MartProductCard from '../../components/MartProductCard';
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

      <main className="px-4 pb-16 pt-24">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
                  <ShoppingBag className="h-4 w-4" />
                  Gwan Mart
                </div>
                <h1 className="text-3xl font-bold md:text-4xl">
                  Catálogo{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    completo
                  </span>
                </h1>
                <p className="text-muted-foreground">
                  {loading || aiSearchLoading
                    ? 'Carregando...'
                    : isAISearch
                      ? `${aiSearchResults.length} produtos similares encontrados`
                      : `${pagination.total} produtos encontrados`}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden text-sm text-muted-foreground sm:inline">
                  Precisa de ajuda?
                </span>
                <Button onClick={openChat} className="shadow-glow-primary">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Falar com o Atendente
                </Button>
              </div>
            </div>
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
              <p className="text-sm text-muted-foreground">
                {isAISearch
                  ? 'Tente uma busca diferente ou volte para a busca normal'
                  : 'Tente ajustar os filtros ou fazer uma nova busca'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(isAISearch ? aiSearchResults : products).map(product => (
                <MartProductCard
                  key={product.id}
                  product={product}
                  showSimilarity={isAISearch}
                />
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

      <Footer />

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
