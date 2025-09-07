import { useState, useEffect } from 'react';
import { ProductData, fetchProduct } from '../services/product.service';

export const useProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setError('ID do produto não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const productData = await fetchProduct(productId);

        if (productData) {
          setProduct(productData);
        } else {
          setError('Produto não encontrado');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar produto'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  return { product, loading, error };
};
