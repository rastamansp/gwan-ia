// Função para formatar preços em reais brasileiros
export const formatPrice = (price: number | string | undefined | null): string => {
  if (!price || price === 0 || price === '0') {
    return 'R$ 0,00';
  }
  
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numericPrice)) {
    return 'R$ 0,00';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericPrice);
};

// Função para calcular desconto percentual
export const calculateDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
    return 0;
  }
  
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
