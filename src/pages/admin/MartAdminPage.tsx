import React, { useState } from 'react';
import { useProductAdmin } from '../../hooks/useProductAdmin';
import { SearchParams } from '../../types/search.types';
import { ProductFormData } from '../../services/product-admin.service';
import AppLayout from '../../components/layout/AppLayout';
import Pagination from '../../components/Pagination';
import { useToast } from '../../hooks/useToast';
import ToastContainer from '../../components/ui/ToastContainer';
import { ProductFormModal, ImportJSONModal } from '../../components/admin';

interface Product {
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
  deletedAt?: string;
  images: string[];
  variations?: any;
}

const MartAdminPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 20,
    search: '',
    category: '',
    subcategory: '',
  });

  const {
    products,
    loading,
    error,
    pagination,
    categories,
    subcategories,
    deleteProduct,
    createProduct,
    updateProduct,
    changePage,
  } = useProductAdmin(searchParams);

  const { toasts, showSuccess, showError } = useToast();

  // Estados para modais e formulários
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Função para buscar produtos
  const handleSearch = (searchTerm: string) => {
    setSearchParams(prev => ({ ...prev, search: searchTerm, page: 1 }));
  };

  // Função para filtrar por categoria
  const handleCategoryFilter = (category: string) => {
    setSearchParams(prev => ({ ...prev, category, page: 1 }));
  };

  // Função para filtrar por subcategoria
  const handleSubcategoryFilter = (subcategory: string) => {
    setSearchParams(prev => ({ ...prev, subcategory, page: 1 }));
  };

  // Função para abrir modal de criação
  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  // Função para abrir modal de importação JSON
  const handleImportJSON = () => {
    setShowImportModal(true);
  };

  // Função para abrir modal de edição
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Função para abrir modal de exclusão
  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // Função para lidar com envio do formulário
  const handleProductSubmit = async (formData: ProductFormData) => {
    try {
      let result;

      if (selectedProduct) {
        // Editar produto existente
        result = await updateProduct(selectedProduct.id.toString(), formData);
        if (result.success) {
          showSuccess(`Produto "${formData.name}" atualizado com sucesso!`);
        }
      } else {
        // Criar novo produto
        result = await createProduct(formData);
        if (result.success) {
          showSuccess(`Produto "${formData.name}" criado com sucesso!`);
        }
      }

      if (!result.success) {
        return { success: false, error: result.error };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro inesperado ao salvar produto' };
    }
  };

  // Função para confirmar exclusão
  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      const result = await deleteProduct(selectedProduct.id.toString());

      if (result.success) {
        showSuccess(`Produto "${selectedProduct.name}" excluído com sucesso!`);
        setShowDeleteModal(false);
        setSelectedProduct(null);
      } else {
        showError(result.error || 'Erro ao excluir produto');
      }
    } catch (error) {
      showError('Erro ao excluir produto');
    }
  };

  // Função para formatar preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  // Função para formatar status do produto
  const getProductStatus = (product: Product) => {
    if (!product.isActive)
      return { text: 'Inativo', color: 'text-red-600 bg-red-100' };
    if (product.stock === 0)
      return { text: 'Sem estoque', color: 'text-orange-600 bg-orange-100' };
    if (product.stock < 10)
      return { text: 'Estoque baixo', color: 'text-yellow-600 bg-yellow-100' };
    return { text: 'Disponível', color: 'text-green-600 bg-green-100' };
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header da página */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                🛍️ Administração do Mart
              </h1>
              <p className="text-gray-400 mt-2">
                Gerencie produtos, estoque e configurações da loja
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleCreateProduct}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Novo Produto</span>
              </button>

              <button
                onClick={handleImportJSON}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
                <span>Importar JSON</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filtros e busca */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Busca */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Buscar produtos
              </label>
              <input
                type="text"
                placeholder="Nome, código ou descrição..."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                onChange={e => handleSearch(e.target.value)}
              />
            </div>

            {/* Filtro por categoria */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Categoria
              </label>
              <select
                value={searchParams.category || ''}
                onChange={e => handleCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por subcategoria */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Subcategoria
              </label>
              <select
                value={searchParams.subcategory || ''}
                onChange={e => handleSubcategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="">Todas as subcategorias</option>
                {subcategories.map(subcategory => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de produtos */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-gray-400 mt-2">Carregando produtos...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-400">Erro ao carregar produtos: {error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">Nenhum produto encontrado</p>
            </div>
          ) : (
            <>
              {/* Cabeçalho da tabela */}
              <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-300">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-2">Imagem</div>
                  <div className="col-span-3">Produto</div>
                  <div className="col-span-2">Categoria</div>
                  <div className="col-span-1">Preço</div>
                  <div className="col-span-1">Estoque</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Ações</div>
                </div>
              </div>

              {/* Lista de produtos */}
              <div className="divide-y divide-gray-600">
                {products.map(product => {
                  const status = getProductStatus(product);
                  return (
                    <div
                      key={product.id}
                      className="px-6 py-4 hover:bg-gray-700 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* ID */}
                        <div className="col-span-1 text-sm text-gray-400">
                          #{product.id}
                        </div>

                        {/* Imagem */}
                        <div className="col-span-2">
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                            onError={e => {
                              // Substituir por um SVG inline em vez de uma URL externa
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (
                                parent &&
                                !parent.querySelector('.placeholder-svg')
                              ) {
                                parent.innerHTML = `
                                  <div class="placeholder-svg w-16 h-16 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-center">
                                    <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                    </svg>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>

                        {/* Produto */}
                        <div className="col-span-3">
                          <h3 className="font-medium text-white">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {product.code}
                          </p>
                          {product.description && (
                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                        </div>

                        {/* Categoria */}
                        <div className="col-span-2">
                          <span className="text-sm text-white">
                            {product.category}
                          </span>
                          {product.subcategory && (
                            <p className="text-xs text-gray-400">
                              {product.subcategory}
                            </p>
                          )}
                        </div>

                        {/* Preço */}
                        <div className="col-span-1">
                          {product.promotionalPrice &&
                          product.promotionalPrice < product.originalPrice ? (
                            <>
                              <span className="font-medium text-white">
                                {formatPrice(product.promotionalPrice)}
                              </span>
                              <p className="text-xs text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </p>
                            </>
                          ) : (
                            <span className="font-medium text-white">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Estoque */}
                        <div className="col-span-1">
                          <span className="text-sm text-white">
                            {product.stock}
                          </span>
                        </div>

                        {/* Status */}
                        <div className="col-span-1">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
                          >
                            {status.text}
                          </span>
                        </div>

                        {/* Ações */}
                        <div className="col-span-1">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                              title="Editar produto"
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                              title="Excluir produto"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Paginação */}
              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-600">
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={changePage}
                    totalItems={pagination.total}
                    itemsPerPage={pagination.limit}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal de confirmação de exclusão */}
        {showDeleteModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                Confirmar Exclusão
              </h3>
              <p className="text-gray-400 mb-6">
                Tem certeza que deseja excluir o produto{' '}
                <strong className="text-white">"{selectedProduct.name}"</strong>
                ? Esta ação não pode ser desfeita.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de formulário de produto */}
        <ProductFormModal
          isOpen={showProductModal}
          onClose={() => {
            setShowProductModal(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleProductSubmit}
          product={selectedProduct}
          categories={categories}
          subcategories={subcategories}
          loading={loading}
        />

        {/* Modal de importação JSON */}
        <ImportJSONModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onSubmit={handleProductSubmit}
        />

        {/* Toast Container */}
        <ToastContainer toasts={toasts} />
      </div>
    </AppLayout>
  );
};

export default MartAdminPage;
