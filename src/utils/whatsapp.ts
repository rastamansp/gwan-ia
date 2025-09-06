/**
 * Utilitários para integração com WhatsApp
 */

export interface WhatsAppProductData {
  id: string;
  name: string;
  quantity: number;
  origin: string;
  price?: number;
  selectedOption?: string;
  zipCode?: string;
}

/**
 * Gera o link do WhatsApp para compra de produto
 * @param productData - Dados do produto
 * @returns URL formatada para WhatsApp
 */
export const generateWhatsAppLink = (
  productData: WhatsAppProductData
): string => {
  const phoneNumber = '5511987221050'; // DDD + número internacional

  // Monta a mensagem com os dados do produto
  const message = `🛒 *COMPRA VIA GWAN MART*

📦 *Produto:* ${productData.name}
🆔 *ID:* ${productData.id}
${productData.selectedOption ? `🎨 *Opção selecionada:* ${productData.selectedOption}` : ''}
📊 *Quantidade:* ${productData.quantity}
🚚 *Frete de origem:* ${productData.origin}
${productData.zipCode ? `📍 *CEP de entrega:* ${productData.zipCode}` : ''}
${productData.price ? `💰 *Preço:* R$ ${productData.price.toFixed(2)}` : ''}

Olá! Gostaria de comprar este produto. Podem me ajudar com mais informações?`;

  // Codifica a mensagem para URL
  const encodedMessage = encodeURIComponent(message);

  // Retorna o link formatado
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Abre o WhatsApp com a mensagem formatada
 * @param productData - Dados do produto
 */
export const openWhatsApp = (productData: WhatsAppProductData): void => {
  const link = generateWhatsAppLink(productData);
  window.open(link, '_blank');
};
