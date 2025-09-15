import { buildApiUrl } from '../utils/api-url';

// Interfaces para produtos
export interface ProductFormData {
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
  gtinEanPackage?: string;
  supplierProductDescription?: string;
  discountPercentage?: number;
  realImage?: string;
  // Campos legados para compatibilidade
  gtinEan?: string;
  ncm?: string;
  thumbnail?: string;
}

export interface ProductResponse {
  status: string;
  data: any;
  error: string | null;
  timestamp: string;
}

export interface ProductsListResponse {
  status: string;
  data: {
    products: any[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    categories: string[];
    subcategories: string[];
  };
  error: string | null;
  timestamp: string;
}

// Classe para gerenciar produtos
export class ProductAdminService {
  private static instance: ProductAdminService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  public static getInstance(): ProductAdminService {
    if (!ProductAdminService.instance) {
      ProductAdminService.instance = new ProductAdminService();
    }
    return ProductAdminService.instance;
  }

  // Obter token de autenticação
  private getAuthToken(): string | null {
    const session = localStorage.getItem('userSession');
    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        return parsedSession.token;
      } catch (error) {
        console.error('Erro ao parsear sessão:', error);
        return null;
      }
    }
    return null;
  }

  // Headers padrão com autenticação
  private getHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Listar produtos com filtros e paginação
  async getProducts(
    params: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      subcategory?: string;
    } = {}
  ): Promise<ProductsListResponse> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.category) queryParams.append('category', params.category);
    if (params.subcategory)
      queryParams.append('subcategory', params.subcategory);

    const url = buildApiUrl(this.baseUrl, `products?${queryParams.toString()}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Listar todos os produtos (sem paginação)
  async getAllProducts(): Promise<ProductsListResponse> {
    const url = buildApiUrl(this.baseUrl, 'products/all');

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Buscar produto por ID
  async getProductById(id: string): Promise<ProductResponse> {
    const url = buildApiUrl(this.baseUrl, `products/${id}`);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Criar novo produto
  async createProduct(productData: ProductFormData): Promise<ProductResponse> {
    const url = buildApiUrl(this.baseUrl, 'products');

    // Filtrar apenas os campos que a API espera
    const apiData = {
      name: productData.name,
      code: productData.code,
      description: productData.description,
      category: productData.category,
      subcategory: productData.subcategory,
      costPrice: productData.costPrice,
      originalPrice: productData.originalPrice,
      promotionalPrice: productData.promotionalPrice,
      stock: productData.stock,
      supplier: productData.supplier,
      gtinEanPackage: productData.gtinEanPackage,
      supplierProductDescription: productData.supplierProductDescription,
      discountPercentage: productData.discountPercentage,
      realImage: productData.realImage,
      // Campos adicionais que a API espera
      ncm: productData.ncm || '',
      gtinEan: productData.gtinEan || productData.gtinEanPackage || '',
      thumbnail: productData.thumbnail || productData.realImage || '',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Atualizar produto
  async updateProduct(
    id: string,
    productData: Partial<ProductFormData>
  ): Promise<ProductResponse> {
    const url = buildApiUrl(this.baseUrl, `products/${id}`);

    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Deletar produto (soft delete)
  async deleteProduct(id: string): Promise<ProductResponse> {
    const url = buildApiUrl(this.baseUrl, `products/${id}`);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Obter produtos em destaque
  async getFeaturedProducts(): Promise<ProductsListResponse> {
    const url = buildApiUrl(this.baseUrl, 'products/featured');

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}

// Instância singleton
export const productAdminService = ProductAdminService.getInstance();
