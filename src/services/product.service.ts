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
  thumbnail: string;
  imagens: string[];
  category: string;
  subcategory: string;
  originalPrice: number;
  promotionalPrice: number | null;
  discountPercentage: number;
  averageRating: number;
  totalReviews: number;
  variations: any;
  realImage: string;
  name: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  // Campos opcionais para compatibilidade
  availableVariations?: any[];
  defaultVariation?: any;
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
  originalPrice: number;
  promotionalPrice?: number | null;
  thumbnail: string;
  averageRating: number;
  totalReviews: number;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  // Campos adicionais da API
  ncm: string;
  costPrice: number;
  supplier: string;
  gtinEan: string;
  gtinEanPackage: string;
  supplierProductDescription: string;
  realImage: string;
  variations: any;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface FeaturedProductsResponse {
  status: string;
  data: FeaturedProduct[]; // A API retorna os produtos diretamente no data
  error: null | string;
  timestamp: string;
}

// Função para buscar produto por ID
export const fetchProduct = async (
  productId: string
): Promise<ProductData | null> => {
  try {
    const response = await fetch(
      buildApiUrl(import.meta.env.VITE_API_URL, `products/${productId}`)
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();

    if (result.status === 'success' && result.data) {
      // Processar os dados para converter strings em números
      const processedProduct = {
        ...result.data,
        costPrice: parseFloat(String(result.data.costPrice)) || 0,
        originalPrice: parseFloat(String(result.data.originalPrice)) || 0,
        promotionalPrice:
          parseFloat(String(result.data.promotionalPrice || 0)) || 0,
        discountPercentage:
          parseFloat(String(result.data.discountPercentage)) || 0,
        averageRating: parseFloat(String(result.data.averageRating)) || 0,
        stock: parseInt(String(result.data.stock)) || 0,
        totalReviews: parseInt(String(result.data.totalReviews)) || 0,
        // Garantir que imagens seja um array
        imagens: Array.isArray(result.data.imagens) ? result.data.imagens : [],
        // Garantir que availableVariations seja um array
        availableVariations: Array.isArray(result.data.availableVariations)
          ? result.data.availableVariations
          : [],
      };

      return processedProduct;
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
    const url = buildApiUrl(import.meta.env.VITE_API_URL, 'products/featured');
    console.log('Fetching featured products from:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result: FeaturedProductsResponse = await response.json();
    console.log('Featured products API response:', result);

    if (result.status === 'success' && result.data) {
      console.log('Products data:', result.data);
      // A API retorna os produtos diretamente no data, não em data.products
      const products = Array.isArray(result.data) ? result.data : [];

      // Processar os dados para converter strings em números
      const processedProducts = products.map((product: any) => ({
        ...product,
        costPrice: parseFloat(product.costPrice) || 0,
        originalPrice: parseFloat(product.originalPrice) || 0,
        promotionalPrice: parseFloat(product.promotionalPrice) || 0,
        discountPercentage: parseFloat(product.discountPercentage) || 0,
        averageRating: parseFloat(product.averageRating) || 0,
        stock: parseInt(product.stock) || 0,
        totalReviews: parseInt(product.totalReviews) || 0,
      }));

      return processedProducts;
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
      buildApiUrl(import.meta.env.VITE_API_URL, 'products')
    );

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result: FeaturedProductsResponse = await response.json();

    if (result.status === 'success' && result.data) {
      console.log('Products data:', result.data);
      // A API retorna os produtos diretamente no data, não em data.products
      return Array.isArray(result.data) ? result.data : [];
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
      'products',
      params as Record<string, string | number | boolean | undefined>
    );

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result: PaginatedResponse<FeaturedProduct> = await response.json();

    if (result.status === 'success') {
      // Processar os dados para converter strings em números
      const processedProducts = result.data.products.map((product: any) => ({
        ...product,
        costPrice: parseFloat(product.costPrice) || 0,
        originalPrice: parseFloat(product.originalPrice) || 0,
        promotionalPrice: parseFloat(product.promotionalPrice) || 0,
        discountPercentage: parseFloat(product.discountPercentage) || 0,
        averageRating: parseFloat(product.averageRating) || 0,
        stock: parseInt(product.stock) || 0,
        totalReviews: parseInt(product.totalReviews) || 0,
      }));

      return {
        ...result,
        data: {
          ...result.data,
          products: processedProducts,
        },
      };
    }

    throw new Error(result.error || 'Erro ao buscar produtos');
  } catch (error) {
    console.error('Erro ao buscar produtos com filtros:', error);
    throw error;
  }
};
