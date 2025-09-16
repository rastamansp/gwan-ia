import { useState, useEffect } from 'react';
import {
  ProductData,
  fetchProductUniversal,
} from '../services/product.service';

export const useProduct = (param: string | undefined) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!param) {
        setError('Parâmetro do produto não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const productData = await fetchProductUniversal(param);

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
  }, [param]);

  return { product, loading, error };
};
