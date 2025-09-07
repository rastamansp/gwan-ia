import { useState, useEffect } from 'react';
import { FeaturedProduct, fetchAllProducts } from '../services/product.service';

export const useAllProducts = () => {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const allProducts = await fetchAllProducts();
        setProducts(allProducts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar produtos'
        );
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  return { products, loading, error };
};
