import { useState, useEffect } from 'react';
import {
  FeaturedProduct,
  fetchFeaturedProducts,
} from '../services/product.service';

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const featuredProducts = await fetchFeaturedProducts();
        setProducts(featuredProducts);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erro ao carregar produtos em destaque'
        );
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return { products, loading, error };
};
