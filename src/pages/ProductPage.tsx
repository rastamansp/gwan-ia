import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import { openWhatsApp, WhatsAppProductData } from '../utils/whatsapp';

// Dados mockados dos produtos
const products = {
  'smartphone-premium-5g': {
    id: 'smartphone-premium-5g',
    name: 'Smartphone Premium 5G',
    category: 'Eletrônicos',
    price: 1299.99,
    originalPrice: 1599.99,
    discount: 19,
    rating: 4.9,
    reviews: 127,
    description:
      'O smartphone mais avançado com tecnologia 5G, câmera tripla de 108MP e bateria de longa duração. Design elegante e performance incomparável.',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center',
    ],
    variants: [
      {
        name: 'Preto Espacial',
        price: 1299.99,
        storage: '256GB',
        color: 'Preto',
      },
      { name: 'Azul Oceano', price: 1299.99, storage: '256GB', color: 'Azul' },
      { name: 'Prata Lunar', price: 1399.99, storage: '512GB', color: 'Prata' },
    ],
    specifications: {
      Tela: '6.7" Super AMOLED',
      Processador: 'Snapdragon 8 Gen 2',
      RAM: '12GB',
      Armazenamento: '256GB',
      Câmera: '108MP + 12MP + 8MP',
      Bateria: '5000mAh',
      Sistema: 'Android 14',
    },
  },
  'fone-wireless-premium': {
    id: 'fone-wireless-premium',
    name: 'Fone Wireless Premium',
    category: 'Áudio',
    price: 399.99,
    originalPrice: 499.99,
    discount: 20,
    rating: 4.8,
    reviews: 89,
    description:
      'Fone de ouvido sem fio com cancelamento de ruído ativo, qualidade de som premium e bateria de longa duração.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center',
    ],
    variants: [
      { name: 'Preto', price: 399.99, storage: 'Padrão', color: 'Preto' },
      { name: 'Branco', price: 399.99, storage: 'Padrão', color: 'Branco' },
      {
        name: 'Azul',
        price: 429.99,
        storage: 'Edição Limitada',
        color: 'Azul',
      },
    ],
    specifications: {
      Tipo: 'Over-ear sem fio',
      'Cancelamento de Ruído': 'Ativo',
      Bateria: '30 horas',
      Conexão: 'Bluetooth 5.3',
      Alcance: '10 metros',
      Peso: '250g',
      Garantia: '12 meses',
    },
  },
  'notebook-gamer-pro': {
    id: 'notebook-gamer-pro',
    name: 'Notebook Gamer Pro',
    category: 'Computadores',
    price: 2499.99,
    originalPrice: 2999.99,
    discount: 15,
    rating: 4.7,
    reviews: 156,
    description:
      'Notebook gamer de alta performance com placa de vídeo dedicada, processador potente e tela de alta resolução.',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center',
    ],
    variants: [
      {
        name: 'Preto Gamer',
        price: 2499.99,
        storage: '512GB SSD',
        color: 'Preto',
      },
      { name: 'RGB Edition', price: 2699.99, storage: '1TB SSD', color: 'RGB' },
    ],
    specifications: {
      Tela: '15.6" Full HD 144Hz',
      Processador: 'Intel i7-12700H',
      'Placa de Vídeo': 'RTX 4060 8GB',
      RAM: '16GB DDR4',
      Armazenamento: '512GB SSD',
      Sistema: 'Windows 11',
      Peso: '2.3kg',
    },
  },
  'smartwatch-fitness': {
    id: 'smartwatch-fitness',
    name: 'Smartwatch Fitness',
    category: 'Wearables',
    price: 599.99,
    originalPrice: 799.99,
    discount: 25,
    rating: 4.6,
    reviews: 203,
    description:
      'Smartwatch completo para fitness com monitoramento de saúde, GPS integrado e bateria de longa duração.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center',
    ],
    variants: [
      {
        name: 'Preto Esportivo',
        price: 599.99,
        storage: 'Padrão',
        color: 'Preto',
      },
      { name: 'Rosa Fitness', price: 599.99, storage: 'Padrão', color: 'Rosa' },
      {
        name: 'Azul Premium',
        price: 649.99,
        storage: 'Edição Premium',
        color: 'Azul',
      },
    ],
    specifications: {
      Tela: '1.4" AMOLED',
      Bateria: '7 dias',
      Resistência: '5ATM',
      GPS: 'Integrado',
      Monitoramento: 'Frequência cardíaca',
      Conexão: 'Bluetooth 5.0',
      Compatibilidade: 'iOS/Android',
    },
  },
};

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [origin, setOrigin] = useState('São Paulo - SP');
  const [zipCode, setZipCode] = useState('');

  const product = productId
    ? products[productId as keyof typeof products]
    : null;

  const formatZipCode = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    // Aplica a máscara 00000-000
    if (numbers.length <= 5) {
      return numbers;
    } else {
      return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
    }
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatZipCode(e.target.value);
    setZipCode(formatted);
  };

  const handleWhatsAppClick = () => {
    if (!product) return;

    const selectedOption = product.variants[selectedVariant];
    const productData: WhatsAppProductData = {
      id: product.id,
      name: product.name,
      quantity: quantity,
      origin: origin,
      price: selectedOption?.price || product.price,
      selectedOption: selectedOption?.name,
      zipCode: zipCode.trim() || undefined,
    };

    openWhatsApp(productData);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Produto não encontrado
          </h1>
          <Link to="/gwan-mart" className="text-primary hover:text-primary/80">
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">
            {product.category}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="rounded-lg border text-card-foreground shadow-sm overflow-hidden bg-gradient-card shadow-medium">
              <div className="aspect-square bg-gradient-to-br from-muted/20 to-muted/40">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary shadow-soft'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  {product.category}
                </div>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80">
                  -{product.discount}%
                </div>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} avaliações)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Variants */}
            <div className="space-y-3">
              <h3 className="font-medium">Escolha uma opção:</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      selectedVariant === index
                        ? 'border-primary bg-primary/5 shadow-soft'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{variant.name}</span>
                        <div className="text-sm text-muted-foreground">
                          {variant.storage} • {variant.color}
                        </div>
                      </div>
                      <span className="font-bold text-primary">
                        {formatPrice(variant.price)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Origin Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Quantidade
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Origem do Frete
                </label>
                <select
                  value={origin}
                  onChange={e => setOrigin(e.target.value)}
                  className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="São Paulo - SP">São Paulo - SP</option>
                  <option value="Rio de Janeiro - RJ">
                    Rio de Janeiro - RJ
                  </option>
                  <option value="Belo Horizonte - MG">
                    Belo Horizonte - MG
                  </option>
                  <option value="Brasília - DF">Brasília - DF</option>
                  <option value="Salvador - BA">Salvador - BA</option>
                  <option value="Fortaleza - CE">Fortaleza - CE</option>
                  <option value="Manaus - AM">Manaus - AM</option>
                  <option value="Curitiba - PR">Curitiba - PR</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  CEP de Entrega (Opcional)
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  placeholder="00000-000"
                  maxLength={9}
                  className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Informe seu CEP para cálculo de frete mais preciso
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppClick}
                disabled={selectedVariant === null}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 rounded-md px-8 w-full bg-green-600 hover:bg-green-700 text-white shadow-medium hover:shadow-strong transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                </svg>
                {selectedVariant === null
                  ? 'Selecione uma opção para comprar'
                  : 'Comprar pelo WhatsApp'}
              </button>

              <div className="flex gap-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                  </svg>
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="rounded-lg border text-card-foreground shadow-sm bg-gradient-card shadow-soft">
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-success"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    </svg>
                    <div>
                      <div className="font-medium text-sm">Garantia</div>
                      <div className="text-xs text-muted-foreground">
                        12 meses
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-primary"
                    >
                      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                      <path d="M15 18H9"></path>
                      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                      <circle cx="17" cy="18" r="2"></circle>
                      <circle cx="7" cy="18" r="2"></circle>
                    </svg>
                    <div>
                      <div className="font-medium text-sm">Frete Grátis</div>
                      <div className="text-xs text-muted-foreground">
                        Acima de R$ 199
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-green-600"
                    >
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                    </svg>
                    <div>
                      <div className="font-medium text-sm">Suporte</div>
                      <div className="text-xs text-muted-foreground">
                        Via WhatsApp
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
            <div className="flex flex-col space-y-1.5 p-6 pb-4">
              <h3 className="font-semibold tracking-tight flex items-center gap-2 text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <path d="M15 18H9"></path>
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
                Calcular Frete
              </h3>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <div className="flex gap-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
                  placeholder="00000-000"
                  maxLength={9}
                />
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-primary hover:bg-primary/90">
                  Calcular
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border text-card-foreground shadow-sm bg-gradient-card shadow-soft">
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4">
                Especificações Técnicas
              </h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(
                  ([key, value], index) => (
                    <div key={index}>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                      {index <
                        Object.entries(product.specifications).length - 1 && (
                        <div className="shrink-0 bg-border h-[1px] w-full"></div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
