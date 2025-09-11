import { SearchParams, PaginatedResponse } from '../types/search.types';
import { buildApiUrl, buildApiUrlWithQuery } from '../utils/api-url';

// Serviço para buscar produtos da API
export interface ProductVariation {
  nome: string;
  cor: string;
  disponivel: boolean;
}

export interface ProductData {
  id: number;
  code: string;
  description: string;
  ncm: string;
  stock: number;
  costPrice: number;
  supplier: string;
  gtinEan: string;
  gtinEanPackage: string;
  supplierProductDescription: string;
  isAvailable: boolean;
  hasValidGtinEan: boolean;
  formattedPrice: string;
  thumbnail: string;
  imagens: string[];
  hasValidImages: boolean;
  imageCount: number;
  category: string;
  subcategory: string;
  originalPrice: number;
  promotionalPrice: number | null;
  discountPercentage: number;
  averageRating: number;
  totalReviews: number;
  variations: ProductVariation[];
  realImage: string;
  formattedCurrentPrice: string;
  formattedOriginalPrice: string;
  isOnSale: boolean;
  formattedRating: string;
  formattedReviews: string;
  availableVariations: ProductVariation[];
  defaultVariation: ProductVariation;
}

export interface ApiResponse {
  status: string;
  data: ProductData;
  error: null | string;
  timestamp: string;
}

// Interface para produtos em destaque
export interface FeaturedProduct {
  id: number;
  code: string;
  name: string;
  description?: string;
  category: string;
  subcategory: string;
  discountPercentage: number;
  currentPrice: number;
  originalPrice: number;
  promotionalPrice?: number | null;
  formattedCurrentPrice: string;
  formattedOriginalPrice: string;
  thumbnail: string;
  averageRating: number;
  totalReviews: number;
  formattedRating: string;
  formattedReviews: string;
  stock: number;
  isAvailable: boolean;
}

export interface FeaturedProductsResponse {
  status: string;
  data: {
    products: FeaturedProduct[];
    total: number;
    categories: string[];
  };
  error: null | string;
  timestamp: string;
}

// Função para buscar produto por ID
export const fetchProduct = async (
  productId: string
): Promise<ProductData | null> => {
  try {
    const response = await fetch(
      buildApiUrl(import.meta.env.VITE_API_URL, `api/v1/products/${productId}`)
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();

    if (result.status === 'success' && result.data) {
      return result.data;
    }

    throw new Error(result.error || 'Erro ao buscar produto');
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
};

// Função para buscar produtos em destaque
export const fetchFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
  try {
    const response = await fetch(
      buildApiUrl(import.meta.env.VITE_API_URL, 'api/v1/products/featured')
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result: FeaturedProductsResponse = await response.json();

    if (result.status === 'success' && result.data) {
      return result.data.products;
    }

    throw new Error(result.error || 'Erro ao buscar produtos em destaque');
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);
    return [];
  }
};

// Função para buscar todos os produtos (catálogo completo)
export const fetchAllProducts = async (): Promise<FeaturedProduct[]> => {
  try {
    const response = await fetch(
      buildApiUrl(import.meta.env.VITE_API_URL, 'api/v1/products')
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result: FeaturedProductsResponse = await response.json();

    if (result.status === 'success' && result.data) {
      return result.data.products;
    }

    throw new Error(result.error || 'Erro ao buscar produtos');
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

// Função para buscar produtos com filtros
export const fetchProductsWithFilters = async (
  params: SearchParams = {}
): Promise<PaginatedResponse<FeaturedProduct>> => {
  try {
    const url = buildApiUrlWithQuery(
      import.meta.env.VITE_API_URL,
      'api/v1/products',
      params as Record<string, string | number | boolean | undefined>
    );

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result: PaginatedResponse<FeaturedProduct> = await response.json();

    if (result.status === 'success') {
      return result;
    }

    throw new Error(result.error || 'Erro ao buscar produtos');
  } catch (error) {
    console.error('Erro ao buscar produtos com filtros:', error);
    throw error;
  }
};
