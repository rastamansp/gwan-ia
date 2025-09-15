import { useState, useEffect } from 'react';
import {
  FeaturedProduct,
  fetchProductsWithFilters,
} from '../services/product.service';
import { SearchParams, PaginatedResponse } from '../types/search.types';

export const useProductsWithFilters = (initialParams: SearchParams = {}) => {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [currentParams, setCurrentParams] =
    useState<SearchParams>(initialParams);

  const searchProducts = async (params: SearchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Atualizar parâmetros atuais
      const newParams = { ...currentParams, ...params };
      setCurrentParams(newParams);

      const result: PaginatedResponse<FeaturedProduct> =
        await fetchProductsWithFilters(newParams);

      // Debug: verificar dados dos produtos
      console.log('Products data:', result.data.products);
      if (result.data.products.length > 0) {
        console.log('First product details:', {
          id: result.data.products[0].id,
          name: result.data.products[0].name,
          code: result.data.products[0].code,
          description: result.data.products[0].description,
          currentPrice:
            result.data.products[0].promotionalPrice ||
            result.data.products[0].originalPrice,
          originalPrice: result.data.products[0].originalPrice,
          promotionalPrice: result.data.products[0].promotionalPrice,
          formattedCurrentPrice: `R$ ${Number(result.data.products[0].promotionalPrice || result.data.products[0].originalPrice || 0).toLocaleString('pt-BR')}`,
          formattedOriginalPrice: `R$ ${Number(result.data.products[0].originalPrice || 0).toLocaleString('pt-BR')}`,
          discountPercentage: result.data.products[0].discountPercentage,
        });
      }

      setProducts(result.data.products);
      setPagination({
        total: result.data.total,
        page: result.data.page,
        limit: result.data.limit,
        totalPages: result.data.totalPages,
      });
      setCategories(result.data.categories);
      setSubcategories(result.data.subcategories);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar produtos'
      );
    } finally {
      setLoading(false);
    }
  };

  const changePage = (page: number) => {
    searchProducts({ ...currentParams, page });
  };

  const changeLimit = (limit: number) => {
    searchProducts({ ...currentParams, page: 1, limit });
  };

  useEffect(() => {
    searchProducts(initialParams);
  }, []);

  return {
    products,
    loading,
    error,
    pagination,
    categories,
    subcategories,
    searchProducts,
    changePage,
    changeLimit,
    currentParams,
  };
};
