// Interface para parâmetros de busca e filtros
export interface SearchParams {
  search?: string;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  minRating?: number;
  inStock?: boolean;
  onSale?: boolean;
  sortBy?: 'price' | 'name' | 'rating' | 'discount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Interface para resposta da API com paginação
export interface PaginatedResponse<T> {
  status: string;
  data: {
    products: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    categories: string[];
    subcategories: string[];
  };
  error: null | string;
  timestamp: string;
}
