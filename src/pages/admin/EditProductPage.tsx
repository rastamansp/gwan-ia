import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductAdmin } from '../../hooks/useProductAdmin';
import { ProductFormData } from '../../services/product-admin.service';
import AppLayout from '../../components/layout/AppLayout';
import { useToast } from '../../hooks/useToast';
import ToastContainer from '../../components/ui/ToastContainer';
import { ProductFormModal } from '../../components/admin';

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
  variations?: Record<string, unknown>;
}

const EditProductPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { toasts, showSuccess, showError } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { categories, subcategories, updateProduct, getProductById } =
    useProductAdmin();

  // Carregar produto ao montar o componente
  useEffect(() => {
    const loadProduct = async () => {
      if (!code) {
        setError('Código do produto não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Buscar produto por código (usando getProductById que aceita códigos)
        const productData = await getProductById(code);

        if (productData) {
          setProduct(productData);
        } else {
          setError('Produto não encontrado');
        }
      } catch (err) {
        console.error('Erro ao carregar produto:', err);
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar produto'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [code, getProductById]);

  // Função para lidar com envio do formulário
  const handleProductSubmit = async (formData: ProductFormData) => {
    if (!product) return { success: false, error: 'Produto não encontrado' };

    try {
      setSubmitting(true);

      const result = await updateProduct(product.id.toString(), formData);

      if (result.success) {
        showSuccess(`Produto "${formData.name}" atualizado com sucesso!`);

        // Atualizar dados locais do produto
        setProduct(prev => (prev ? { ...prev, ...formData } : null));

        // Fechar modal
        setShowModal(false);

        return { success: true };
      } else {
        showError(result.error || 'Erro ao atualizar produto');
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Erro inesperado ao salvar produto';
      showError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setSubmitting(false);
    }
  };

  // Função para voltar
  const handleGoBack = () => {
    navigate('/admin/mart');
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

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Carregando produto...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error || !product) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto">
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Erro ao carregar produto
            </h2>
            <p className="text-gray-400 mb-6">
              {error || 'Produto não encontrado'}
            </p>
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Voltar para Administração
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const status = getProductStatus(product);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header da página */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Voltar"
              >
                <svg
                  className="w-6 h-6"
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
              <div>
                <h1 className="text-3xl font-bold text-white">
                  ✏️ Editar Produto
                </h1>
                <p className="text-gray-400 mt-2">Editando: {product.name}</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Editar Produto</span>
            </button>
          </div>
        </div>

        {/* Informações do produto */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Informações do Produto
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Imagem do produto */}
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Imagem</h3>
              <div className="w-full h-64 bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder-svg')) {
                        parent.innerHTML = `
                          <div class="placeholder-svg w-full h-full bg-gray-700 flex items-center justify-center">
                            <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Detalhes do produto */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">
                  Detalhes
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Nome
                    </label>
                    <p className="text-white">{product.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Código
                    </label>
                    <p className="text-white">{product.code}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Categoria
                    </label>
                    <p className="text-white">
                      {product.category} - {product.subcategory}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Status
                    </label>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
                    >
                      {status.text}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações financeiras */}
          <div className="mt-6 pt-6 border-t border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">
              Informações Financeiras
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Preço Original
                </label>
                <p className="text-white text-lg font-semibold">
                  {formatPrice(product.originalPrice)}
                </p>
              </div>
              {product.promotionalPrice && (
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Preço Promocional
                  </label>
                  <p className="text-green-400 text-lg font-semibold">
                    {formatPrice(product.promotionalPrice)}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Estoque
                </label>
                <p className="text-white text-lg font-semibold">
                  {product.stock} unidades
                </p>
              </div>
            </div>
          </div>

          {/* Informações técnicas */}
          <div className="mt-6 pt-6 border-t border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">
              Informações Técnicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Fornecedor
                </label>
                <p className="text-white">{product.supplier}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  GTIN/EAN
                </label>
                <p className="text-white">{product.gtinEan}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  NCM
                </label>
                <p className="text-white">{product.ncm}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Criado em
                </label>
                <p className="text-white">
                  {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de edição */}
        <ProductFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleProductSubmit}
          product={product}
          categories={categories}
          subcategories={subcategories}
          loading={submitting}
        />

        {/* Toast Container */}
        <ToastContainer toasts={toasts} />
      </div>
    </AppLayout>
  );
};

export default EditProductPage;
