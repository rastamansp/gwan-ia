import React, { useState } from 'react';
import { ProductFormData } from '../../services/product-admin.service';

interface ImportJSONModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ProductFormData
  ) => Promise<{ success: boolean; error?: string }>;
}

const ImportJSONModal: React.FC<ImportJSONModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedData, setParsedData] = useState<ProductFormData | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Exemplo de JSON para referência
  const exampleJSON = {
    name: 'Produto Exemplo',
    code: 'PROD001',
    description: 'Descrição do produto exemplo',
    category: 'Eletrônicos',
    subcategory: 'Smartphones',
    costPrice: 500.0,
    originalPrice: 800.0,
    promotionalPrice: 700.0,
    stock: 50,
    supplier: 'Fornecedor ABC',
    gtinEanPackage: '1234567890123',
    supplierProductDescription: 'Descrição do fornecedor',
    discountPercentage: 12.5,
    realImage: 'https://exemplo.com/imagem.jpg',
    ncm: '85171200',
    gtinEan: '1234567890123',
    thumbnail: 'https://exemplo.com/imagem.jpg',
  };

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    setError('');
    setParsedData(null);

    if (value.trim()) {
      try {
        const parsed = JSON.parse(value);

        // Validar se tem os campos obrigatórios
        if (!parsed.name || !parsed.code) {
          setError('JSON deve conter pelo menos "name" e "code"');
          return;
        }

        // Mapear os dados para o formato esperado pela API
        const productData: ProductFormData = {
          name: parsed.name || '',
          code: parsed.code || '',
          description: parsed.description || '',
          category: parsed.category || '',
          subcategory: parsed.subcategory || '',
          costPrice: parseFloat(parsed.costPrice) || 0,
          originalPrice: parseFloat(parsed.originalPrice) || 0,
          promotionalPrice: parseFloat(parsed.promotionalPrice) || 0,
          stock: parseInt(parsed.stock) || 0,
          supplier: parsed.supplier || '',
          gtinEanPackage: parsed.gtinEanPackage || parsed.gtinEan || '',
          supplierProductDescription:
            parsed.supplierProductDescription || parsed.description || '',
          discountPercentage: parseFloat(parsed.discountPercentage) || 0,
          realImage: parsed.realImage || parsed.thumbnail || '',
          // Campos adicionais que a API espera
          gtinEan: parsed.gtinEan || parsed.gtinEanPackage || '',
          ncm: parsed.ncm || '',
          thumbnail: parsed.thumbnail || parsed.realImage || '',
        };

        setParsedData(productData);
      } catch (err) {
        setError('JSON inválido. Verifique a sintaxe.');
      }
    }
  };

  const handleSubmit = async () => {
    if (!parsedData) {
      setError('Por favor, cole um JSON válido primeiro');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await onSubmit(parsedData);
      if (result.success) {
        onClose();
        setJsonInput('');
        setParsedData(null);
        setError('');
      } else {
        setError(result.error || 'Erro ao criar produto');
      }
    } catch (err) {
      setError('Erro inesperado ao criar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setJsonInput('');
    setParsedData(null);
    setError('');
  };

  const insertExample = () => {
    setJsonInput(JSON.stringify(exampleJSON, null, 2));
    handleJsonChange(JSON.stringify(exampleJSON, null, 2));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full mx-4 border border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            📥 Importar Produto via JSON
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
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

        <div className="space-y-6">
          {/* Instruções */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-blue-400 font-medium mb-2">📋 Instruções:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Cole o JSON do produto na área de texto abaixo</li>
              <li>
                • Campos obrigatórios:{' '}
                <code className="bg-gray-700 px-1 rounded">name</code> e{' '}
                <code className="bg-gray-700 px-1 rounded">code</code>
              </li>
              <li>
                • Campos da API:{' '}
                <code className="bg-gray-700 px-1 rounded">gtinEanPackage</code>
                ,{' '}
                <code className="bg-gray-700 px-1 rounded">
                  supplierProductDescription
                </code>
                ,{' '}
                <code className="bg-gray-700 px-1 rounded">
                  discountPercentage
                </code>
                , <code className="bg-gray-700 px-1 rounded">realImage</code>
              </li>
              <li>
                • Campos adicionais:{' '}
                <code className="bg-gray-700 px-1 rounded">ncm</code>,{' '}
                <code className="bg-gray-700 px-1 rounded">gtinEan</code>,{' '}
                <code className="bg-gray-700 px-1 rounded">thumbnail</code>
              </li>
              <li>
                • Use o botão "Inserir Exemplo" para ver o formato esperado
              </li>
              <li>• O JSON será validado automaticamente</li>
            </ul>
          </div>

          {/* Botão para inserir exemplo */}
          <div className="flex justify-end">
            <button
              onClick={insertExample}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              📝 Inserir Exemplo
            </button>
          </div>

          {/* Área de input JSON */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              JSON do Produto
            </label>
            <textarea
              value={jsonInput}
              onChange={e => handleJsonChange(e.target.value)}
              placeholder="Cole o JSON do produto aqui..."
              className="w-full h-64 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
              spellCheck={false}
            />
          </div>

          {/* Preview dos dados */}
          {parsedData && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-3">
                ✅ Preview dos Dados:
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Nome:</span>
                  <span className="text-white ml-2">{parsedData.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Código:</span>
                  <span className="text-white ml-2">{parsedData.code}</span>
                </div>
                <div>
                  <span className="text-gray-400">Categoria:</span>
                  <span className="text-white ml-2">
                    {parsedData.category || 'Não informado'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Subcategoria:</span>
                  <span className="text-white ml-2">
                    {parsedData.subcategory || 'Não informado'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Preço Original:</span>
                  <span className="text-white ml-2">
                    R$ {parsedData.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Estoque:</span>
                  <span className="text-white ml-2">{parsedData.stock}</span>
                </div>
                <div>
                  <span className="text-gray-400">GTIN/EAN:</span>
                  <span className="text-white ml-2">
                    {parsedData.gtinEanPackage || 'Não informado'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Desconto:</span>
                  <span className="text-white ml-2">
                    {parsedData.discountPercentage || 0}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">❌ {error}</p>
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!parsedData || isSubmitting}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Criando...</span>
                </>
              ) : (
                <>
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Criar Produto</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportJSONModal;
