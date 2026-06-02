import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Trash2,
  Tag,
  Star,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchParams } from '../types/search.types';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  loading?: boolean;
  categories?: string[];
  subcategories?: string[];
  // Props para busca com IA
  isAISearch?: boolean;
  onToggleAISearch?: () => void;
}

const ALL = '__all__';

const DEFAULT_PARAMS: SearchParams = {
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
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  loading = false,
  categories = [],
  subcategories = [],
  isAISearch = false,
  onToggleAISearch,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    ...DEFAULT_PARAMS,
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

  const handleSearch = (overrides?: Partial<SearchParams>) => {
    const merged = { ...searchParams, ...overrides };
    // Remove campos vazios antes de enviar
    const cleanParams = Object.fromEntries(
      Object.entries(merged).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null
      )
    ) as SearchParams;

    onSearch(cleanParams);
  };

  const handleReset = () => {
    setSearchParams({ ...DEFAULT_PARAMS });
    onSearch({});
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-6 rounded-xl border border-border bg-card/50 p-6 shadow-soft backdrop-blur-sm">
      {/* Barra de pesquisa principal */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por nome ou código do produto..."
            value={searchParams.search || ''}
            onChange={e => handleInputChange('search', e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-9"
            disabled={loading}
          />
        </div>

        <Button onClick={() => handleSearch()} disabled={loading}>
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          Buscar
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-expanded={showAdvanced}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>

        {onToggleAISearch ? (
          <div className="inline-flex items-center rounded-md border border-input bg-background p-0.5">
            <button
              type="button"
              onClick={() => isAISearch && onToggleAISearch()}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                !isAISearch
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => !isAISearch && onToggleAISearch()}
              className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                isAISearch
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              IA
            </button>
          </div>
        ) : (
          <Button variant="outline" onClick={handleReset}>
            <Trash2 className="h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>

      {/* Filtros avançados */}
      {showAdvanced && (
        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Categoria */}
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={searchParams.category || ALL}
              onValueChange={value =>
                handleInputChange('category', value === ALL ? '' : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subcategoria */}
          <div className="space-y-2">
            <Label>Subcategoria</Label>
            <Select
              value={searchParams.subcategory || ALL}
              onValueChange={value =>
                handleInputChange('subcategory', value === ALL ? '' : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas as subcategorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Todas as subcategorias</SelectItem>
                {subcategories.map(subcategory => (
                  <SelectItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preço mínimo */}
          <div className="space-y-2">
            <Label htmlFor="minPrice">Preço Mínimo (R$)</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="0"
              value={searchParams.minPrice ?? ''}
              onChange={e =>
                handleInputChange(
                  'minPrice',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>

          {/* Preço máximo */}
          <div className="space-y-2">
            <Label htmlFor="maxPrice">Preço Máximo (R$)</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="9999"
              value={searchParams.maxPrice ?? ''}
              onChange={e =>
                handleInputChange(
                  'maxPrice',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>

          {/* Desconto mínimo */}
          <div className="space-y-2">
            <Label htmlFor="minDiscount">Desconto Mínimo (%)</Label>
            <Input
              id="minDiscount"
              type="number"
              placeholder="0"
              min="0"
              max="100"
              value={searchParams.minDiscount ?? ''}
              onChange={e =>
                handleInputChange(
                  'minDiscount',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>

          {/* Avaliação mínima */}
          <div className="space-y-2">
            <Label htmlFor="minRating">Avaliação Mínima</Label>
            <Input
              id="minRating"
              type="number"
              placeholder="0"
              min="0"
              max="5"
              step="0.1"
              value={searchParams.minRating ?? ''}
              onChange={e =>
                handleInputChange(
                  'minRating',
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
            />
          </div>

          {/* Ordenar por */}
          <div className="space-y-2">
            <Label>Ordenar por</Label>
            <Select
              value={searchParams.sortBy || 'name'}
              onValueChange={value =>
                handleInputChange('sortBy', value as SearchParams['sortBy'])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="originalPrice">Preço</SelectItem>
                <SelectItem value="averageRating">Avaliação</SelectItem>
                <SelectItem value="discountPercentage">Desconto</SelectItem>
                <SelectItem value="createdAt">Data de criação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ordem */}
          <div className="space-y-2">
            <Label>Ordem</Label>
            <Select
              value={searchParams.sortOrder || 'ASC'}
              onValueChange={value =>
                handleInputChange(
                  'sortOrder',
                  value as SearchParams['sortOrder']
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ASC">Crescente</SelectItem>
                <SelectItem value="DESC">Decrescente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Filtros rápidos */}
      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => {
            handleInputChange('minDiscount', 10);
            handleSearch({ minDiscount: 10 });
          }}
        >
          <Tag className="h-3.5 w-3.5 text-rose-500" />
          10%+ Desconto
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => {
            handleInputChange('minRating', 4.0);
            handleSearch({ minRating: 4.0 });
          }}
        >
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          4+ Estrelas
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
