import { useState, useEffect, useCallback } from 'react';
import {
  productAdminService,
  ProductFormData,
} from '../services/product-admin.service';
import { SearchParams } from '../types/search.types';

export interface ProductAdminState {
  products: any[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  categories: string[];
  subcategories: string[];
}

export const useProductAdmin = (initialParams: SearchParams = {}) => {
  const [state, setState] = useState<ProductAdminState>({
    products: [],
    loading: true,
    error: null,
    pagination: {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    },
    categories: [],
    subcategories: [],
  });

  const [currentParams, setCurrentParams] =
    useState<SearchParams>(initialParams);

  // Função utilitária para converter preços de string para número
  const processProductData = (products: any[]) => {
    return products.map((product: any) => ({
      ...product,
      costPrice: parseFloat(product.costPrice) || 0,
      originalPrice: parseFloat(product.originalPrice) || 0,
      promotionalPrice: parseFloat(product.promotionalPrice) || 0,
      discountPercentage: parseFloat(product.discountPercentage) || 0,
      averageRating: parseFloat(product.averageRating) || 0,
      stock: parseInt(product.stock) || 0,
      totalReviews: parseInt(product.totalReviews) || 0,
    }));
  };

  // Função para buscar produtos
  const searchProducts = async (params: SearchParams = {}) => {
    try {
      console.log(
        'useProductAdmin: searchProducts called with params:',
        params
      );
      setState(prev => ({ ...prev, loading: true, error: null }));

      const newParams = { ...currentParams, ...params };
      setCurrentParams(newParams);

      const result = await productAdminService.getProducts(newParams);

      if (result.status === 'success') {
        // Converter preços de string para número
        const processedProducts = processProductData(result.data.products);

        setState(prev => ({
          ...prev,
          products: processedProducts,
          pagination: {
            total: result.data.total,
            page: result.data.page,
            limit: result.data.limit,
            totalPages: result.data.totalPages,
          },
          categories: result.data.categories || [],
          subcategories: result.data.subcategories || [],
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: result.error || 'Erro ao carregar produtos',
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Erro ao carregar produtos',
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  // Função para criar produto
  const createProduct = async (productData: ProductFormData) => {
    try {
      console.log('useProductAdmin: createProduct called with:', productData);
      setState(prev => ({ ...prev, loading: true, error: null }));

      const result = await productAdminService.createProduct(productData);

      if (result.status === 'success') {
        // Recarregar lista após criação
        await searchProducts(currentParams);
        return { success: true, data: result.data };
      } else {
        throw new Error(result.error || 'Erro ao criar produto');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao criar produto';
      setState(prev => ({ ...prev, error: errorMessage }));
      return { success: false, error: errorMessage };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  // Função para atualizar produto
  const updateProduct = async (
    id: string,
    productData: Partial<ProductFormData>
  ) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const result = await productAdminService.updateProduct(id, productData);

      if (result.status === 'success') {
        // Recarregar lista após atualização
        await searchProducts(currentParams);
        return { success: true, data: result.data };
      } else {
        throw new Error(result.error || 'Erro ao atualizar produto');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao atualizar produto';
      setState(prev => ({ ...prev, error: errorMessage }));
      return { success: false, error: errorMessage };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  // Função para deletar produto
  const deleteProduct = async (id: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const result = await productAdminService.deleteProduct(id);

      if (result.status === 'success') {
        // Recarregar lista após exclusão
        await searchProducts(currentParams);
        return { success: true };
      } else {
        throw new Error(result.error || 'Erro ao deletar produto');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao deletar produto';
      setState(prev => ({ ...prev, error: errorMessage }));
      return { success: false, error: errorMessage };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  // Função para buscar produto por ID
  const getProductById = useCallback(async (id: string) => {
    try {
      const result = await productAdminService.getProductById(id);

      if (result.status === 'success') {
        // Processar dados do produto (converter preços de string para número)
        const processedProduct = {
          ...result.data,
          costPrice: parseFloat(result.data.costPrice) || 0,
          originalPrice: parseFloat(result.data.originalPrice) || 0,
          promotionalPrice: parseFloat(result.data.promotionalPrice) || 0,
          discountPercentage: parseFloat(result.data.discountPercentage) || 0,
          averageRating: parseFloat(result.data.averageRating) || 0,
          stock: parseInt(result.data.stock) || 0,
          totalReviews: parseInt(result.data.totalReviews) || 0,
        };

        return processedProduct;
      } else {
        throw new Error(result.error || 'Erro ao buscar produto');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao buscar produto';
      throw new Error(errorMessage);
    }
  }, []);

  // Função para mudar página
  const changePage = (page: number) => {
    searchProducts({ ...currentParams, page });
  };

  // Função para mudar limite de itens por página
  const changeLimit = (limit: number) => {
    searchProducts({ ...currentParams, page: 1, limit });
  };

  // Carregar produtos na inicialização
  useEffect(() => {
    searchProducts(initialParams);
  }, []);

  return {
    ...state,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    changePage,
    changeLimit,
  };
};
