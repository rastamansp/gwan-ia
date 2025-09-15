import React, { useState, useEffect } from 'react';
import { ProductFormData } from '../../services/product-admin.service';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ProductFormData
  ) => Promise<{ success: boolean; error?: string }>;
  product?: any; // Produto para edição
  categories: string[];
  subcategories: string[];
  loading?: boolean;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  categories,
  subcategories,
  loading = false,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    code: '',
    description: '',
    category: '',
    subcategory: '',
    costPrice: 0,
    originalPrice: 0,
    promotionalPrice: 0,
    stock: 0,
    supplier: '',
    gtinEan: '',
    ncm: '',
    thumbnail: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preencher formulário quando editando
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        code: product.code || '',
        description: product.description || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        costPrice: product.costPrice || 0,
        originalPrice: product.originalPrice || 0,
        promotionalPrice: product.promotionalPrice || 0,
        stock: product.stock || 0,
        supplier: product.supplier || '',
        gtinEan: product.gtinEan || '',
        ncm: product.ncm || '',
        thumbnail: product.thumbnail || '',
      });
    } else {
      // Resetar formulário para criação
      setFormData({
        name: '',
        code: '',
        description: '',
        category: '',
        subcategory: '',
        costPrice: 0,
        originalPrice: 0,
        promotionalPrice: 0,
        stock: 0,
        supplier: '',
        gtinEan: '',
        ncm: '',
        thumbnail: '',
      });
    }
    setErrors({});
  }, [product, isOpen]);

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Código é obrigatório';
    }

    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (!formData.subcategory) {
      newErrors.subcategory = 'Subcategoria é obrigatória';
    }

    if (formData.costPrice <= 0) {
      newErrors.costPrice = 'Preço de custo deve ser maior que zero';
    }

    if (formData.originalPrice <= 0) {
      newErrors.originalPrice = 'Preço original deve ser maior que zero';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Estoque não pode ser negativo';
    }

    if (!formData.supplier.trim()) {
      newErrors.supplier = 'Fornecedor é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipular mudanças nos campos
  const handleInputChange = (
    field: keyof ProductFormData,
    value: string | number
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Manipular envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(formData);

      if (result.success) {
        onClose();
      } else {
        // Mostrar erro geral se houver
        setErrors({ general: result.error || 'Erro ao salvar produto' });
      }
    } catch (error) {
      setErrors({ general: 'Erro inesperado ao salvar produto' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtrar subcategorias baseado na categoria selecionada
  const filteredSubcategories = subcategories.filter(
    sub =>
      !formData.category ||
      sub.toLowerCase().includes(formData.category.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-600 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {product ? 'Editar Produto' : 'Novo Produto'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Erro geral */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-700">{errors.general}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white border-b border-gray-600 pb-2">
                Informações Básicas
              </h3>

              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Ex: Smartphone Samsung Galaxy"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Código */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Código do Produto *
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={e => handleInputChange('code', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.code ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Ex: SAM-GALAXY-S21"
                />
                {errors.code && (
                  <p className="text-red-600 text-sm mt-1">{errors.code}</p>
                )}
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={e =>
                    handleInputChange('description', e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-white resize-none"
                  placeholder="Descrição detalhada do produto..."
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.category}
                  onChange={e => handleInputChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.category ? 'border-red-500' : 'border-gray-600'
                  }`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Subcategoria */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Subcategoria *
                </label>
                <select
                  value={formData.subcategory}
                  onChange={e =>
                    handleInputChange('subcategory', e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.subcategory ? 'border-red-500' : 'border-gray-600'
                  }`}
                  disabled={!formData.category}
                >
                  <option value="">Selecione uma subcategoria</option>
                  {filteredSubcategories.map(subcategory => (
                    <option key={subcategory} value={subcategory}>
                      {subcategory}
                    </option>
                  ))}
                </select>
                {errors.subcategory && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.subcategory}
                  </p>
                )}
              </div>
            </div>

            {/* Preços e Estoque */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white border-b border-gray-600 pb-2">
                Preços e Estoque
              </h3>

              {/* Preço de Custo */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Preço de Custo *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.costPrice}
                  onChange={e =>
                    handleInputChange(
                      'costPrice',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.costPrice ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="0.00"
                />
                {errors.costPrice && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.costPrice}
                  </p>
                )}
              </div>

              {/* Preço Original */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Preço Original *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.originalPrice}
                  onChange={e =>
                    handleInputChange(
                      'originalPrice',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.originalPrice ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="0.00"
                />
                {errors.originalPrice && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.originalPrice}
                  </p>
                )}
              </div>

              {/* Preço Promocional */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Preço Promocional
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.promotionalPrice || ''}
                  onChange={e =>
                    handleInputChange(
                      'promotionalPrice',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-white"
                  placeholder="0.00"
                />
              </div>

              {/* Estoque */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Estoque *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={e =>
                    handleInputChange('stock', parseInt(e.target.value) || 0)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.stock ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="text-red-600 text-sm mt-1">{errors.stock}</p>
                )}
              </div>

              {/* Fornecedor */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Fornecedor *
                </label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={e => handleInputChange('supplier', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                    errors.supplier ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Nome do fornecedor"
                />
                {errors.supplier && (
                  <p className="text-red-600 text-sm mt-1">{errors.supplier}</p>
                )}
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium text-white border-b border-gray-600 pb-2">
              Informações Adicionais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* GTIN/EAN */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  GTIN/EAN
                </label>
                <input
                  type="text"
                  value={formData.gtinEan}
                  onChange={e => handleInputChange('gtinEan', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-white"
                  placeholder="Código de barras"
                />
              </div>

              {/* NCM */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  NCM
                </label>
                <input
                  type="text"
                  value={formData.ncm}
                  onChange={e => handleInputChange('ncm', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-white"
                  placeholder="Código NCM"
                />
              </div>
            </div>

            {/* URL da Imagem */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                URL da Imagem Principal
              </label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={e => handleInputChange('thumbnail', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border-gray-600 text-white"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <span>{product ? 'Atualizar' : 'Criar'} Produto</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
