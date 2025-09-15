import React, { useState } from 'react';
import { SearchParams } from '../types/search.types';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  loading?: boolean;
  categories?: string[];
  subcategories?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  loading = false,
  categories = [],
  subcategories = [],
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: '',
    category: '',
    subcategory: '',
    minPrice: undefined,
    maxPrice: undefined,
    minDiscount: undefined,
    minRating: undefined,
    sortBy: 'name',
    sortOrder: 'ASC',
    page: 1,
    limit: 20,
  });

  const handleInputChange = (
    field: keyof SearchParams,
    value: string | number | boolean | undefined
  ) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    // Remove campos vazios antes de enviar
    const cleanParams = Object.fromEntries(
      Object.entries(searchParams).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null
      )
    ) as SearchParams;

    onSearch(cleanParams);
  };

  const handleReset = () => {
    setSearchParams({
      search: '',
      category: '',
      subcategory: '',
      minPrice: undefined,
      maxPrice: undefined,
      minDiscount: undefined,
      minRating: undefined,
      sortBy: 'name',
      sortOrder: 'ASC',
      page: 1,
      limit: 20,
    });
    onSearch({});
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-gradient-card border border-border rounded-lg p-6 shadow-soft mb-6">
      {/* Barra de pesquisa principal */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por nome ou código do produto..."
            value={searchParams.search || ''}
            onChange={e => handleInputChange('search', e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            disabled={loading}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-primary hover:bg-primary/90 rounded-md"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          )}
          Buscar
        </button>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M3 6h18"></path>
            <path d="M7 12h10"></path>
            <path d="M10 18h4"></path>
          </svg>
          Filtros
        </button>
        <button
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
          Limpar
        </button>
      </div>

      {/* Filtros avançados */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4 border-t border-border">
          {/* Categoria */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Categoria
            </label>
            <select
              value={searchParams.category || ''}
              onChange={e => handleInputChange('category', e.target.value)}
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategoria */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Subcategoria
            </label>
            <select
              value={searchParams.subcategory || ''}
              onChange={e => handleInputChange('subcategory', e.target.value)}
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Todas as subcategorias</option>
              {subcategories.map(subcategory => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>

          {/* Preço mínimo */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Preço Mínimo (R$)
            </label>
            <input
              type="number"
              placeholder="0"
              value={searchParams.minPrice || ''}
              onChange={e =>
                handleInputChange(
                  'minPrice',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          {/* Preço máximo */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Preço Máximo (R$)
            </label>
            <input
              type="number"
              placeholder="9999"
              value={searchParams.maxPrice || ''}
              onChange={e =>
                handleInputChange(
                  'maxPrice',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          {/* Desconto mínimo */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Desconto Mínimo (%)
            </label>
            <input
              type="number"
              placeholder="0"
              min="0"
              max="100"
              value={searchParams.minDiscount || ''}
              onChange={e =>
                handleInputChange(
                  'minDiscount',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          {/* Avaliação mínima */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Avaliação Mínima
            </label>
            <input
              type="number"
              placeholder="0"
              min="0"
              max="5"
              step="0.1"
              value={searchParams.minRating || ''}
              onChange={e =>
                handleInputChange(
                  'minRating',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          {/* Ordenar por */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Ordenar por
            </label>
            <select
              value={searchParams.sortBy || 'name'}
              onChange={e =>
                handleInputChange(
                  'sortBy',
                  e.target.value as SearchParams['sortBy']
                )
              }
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="name">Nome</option>
              <option value="originalPrice">Preço</option>
              <option value="averageRating">Avaliação</option>
              <option value="discountPercentage">Desconto</option>
              <option value="createdAt">Data de criação</option>
            </select>
          </div>

          {/* Ordem */}
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">
              Ordem
            </label>
            <select
              value={searchParams.sortOrder || 'ASC'}
              onChange={e =>
                handleInputChange(
                  'sortOrder',
                  e.target.value as SearchParams['sortOrder']
                )
              }
              className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="ASC">Crescente</option>
              <option value="DESC">Decrescente</option>
            </select>
          </div>
        </div>
      )}

      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <button
          onClick={() => {
            handleInputChange('minDiscount', 10);
            handleSearch();
          }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          10%+ Desconto
        </button>

        <button
          onClick={() => {
            handleInputChange('minRating', 4.0);
            handleSearch();
          }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
          </svg>
          4+ Estrelas
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
