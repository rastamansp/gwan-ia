import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Star,
  MessageCircle,
  Share2,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
  Info,
} from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { openWhatsApp, WhatsAppProductData } from '../../utils/whatsapp';
import { useProduct } from '../../hooks/useProduct';

const ORIGINS = [
  'São Paulo - SP',
  'Rio de Janeiro - RJ',
  'Belo Horizonte - MG',
  'Brasília - DF',
  'Salvador - BA',
  'Fortaleza - CE',
  'Manaus - AM',
  'Curitiba - PR',
];

const ProductPage: React.FC = () => {
  const { productCode } = useParams<{ productCode: string }>();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(productCode);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [origin, setOrigin] = useState('São Paulo - SP');
  const [zipCode, setZipCode] = useState('');

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

    const selectedOption =
      product.availableVariations && product.availableVariations.length > 0
        ? product.availableVariations[selectedVariant]
        : null;
    const productData: WhatsAppProductData = {
      id: product.id.toString(),
      name: product.name || product.description,
      quantity: quantity,
      origin: origin,
      price: product.promotionalPrice || product.originalPrice,
      selectedOption: selectedOption?.nome,
      zipCode: zipCode.trim() || undefined,
    };

    openWhatsApp(productData);
  };

  const handleShare = async () => {
    const shareData = {
      title: product?.name || product?.description || 'Gwan Mart',
      text: product?.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    } catch (err) {
      // Usuário cancelou o compartilhamento nativo — silenciar
      if (err instanceof DOMException && err.name === 'AbortError') return;
      toast.error('Não foi possível compartilhar o produto.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Carregando produto...
          </h1>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || 'Produto não encontrado'}
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

  // Usar preço promocional se disponível, senão usar preço original
  const currentPrice = product.promotionalPrice || product.originalPrice;
  const isOnSale =
    product.promotionalPrice &&
    product.promotionalPrice < product.originalPrice;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-current text-amber-400'
            : 'text-muted-foreground/40'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">
            {product.category}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">
            {product.name || product.description}
          </span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden bg-gradient-card">
              <div className="aspect-square bg-gradient-to-br from-muted/20 to-muted/40">
                <img
                  src={
                    product.imagens && product.imagens.length > 0
                      ? product.imagens[selectedImage]
                      : product.thumbnail
                  }
                  alt={product.description}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {product.imagens && product.imagens.length > 0 ? (
                product.imagens.map((image, index) => (
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
                      alt={`${product.description} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">
                  Nenhuma imagem adicional disponível
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <span className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {product.category}
                </span>
                {isOnSale && (
                  <span className="inline-flex items-center rounded-full border border-transparent bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name || product.description}
              </h1>

              {product.name && product.description && (
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {product.description}
                </p>
              )}

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(product.averageRating)}</div>
                <span className="text-sm text-muted-foreground">
                  {product.totalReviews} avaliações
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(currentPrice)}
                </span>
                {isOnSale && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="text-muted-foreground leading-relaxed mb-6">
                <p>
                  <strong>Código:</strong> {product.code}
                </p>
                <p>
                  <strong>Estoque:</strong> {product.stock} unidades
                </p>
                <p>
                  <strong>Fornecedor:</strong> {product.supplier}
                </p>
              </div>
            </div>

            {/* Variants */}
            {product.availableVariations &&
              product.availableVariations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium">Escolha uma opção:</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {product.availableVariations.map((variant, index) => (
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
                            <span className="font-medium">{variant.nome}</span>
                            <div className="text-sm text-muted-foreground">
                              {variant.cor} •{' '}
                              {variant.disponivel
                                ? 'Disponível'
                                : 'Indisponível'}
                            </div>
                          </div>
                          <span className="font-bold text-primary">
                            {formatPrice(currentPrice)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* Quantity and Origin Controls */}
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Quantidade</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Origem do Frete</Label>
                <Select value={origin} onValueChange={setOrigin}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ORIGINS.map(city => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="zip" className="mb-2 block">
                  CEP de Entrega (Opcional)
                </Label>
                <Input
                  id="zip"
                  type="text"
                  value={zipCode}
                  onChange={handleZipCodeChange}
                  placeholder="00000-000"
                  maxLength={9}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Informe seu CEP para cálculo de frete mais preciso
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppClick}
                disabled={
                  product.availableVariations &&
                  product.availableVariations.length > 0 &&
                  selectedVariant === null
                }
                size="lg"
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {product.availableVariations &&
                product.availableVariations.length > 0 &&
                selectedVariant === null
                  ? 'Selecione uma opção para comprar'
                  : 'Comprar pelo WhatsApp'}
              </Button>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>

            {/* Features */}
            <Card className="bg-gradient-card">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Garantia</div>
                      <div className="text-xs text-muted-foreground">
                        12 meses
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Truck className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Frete Grátis</div>
                      <div className="text-xs text-muted-foreground">
                        Acima de R$ 199
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <MessageCircle className="h-8 w-8 text-primary" />
                    <div>
                      <div className="font-medium text-sm">Suporte</div>
                      <div className="text-xs text-muted-foreground">
                        Via WhatsApp
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="w-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5 text-primary" />
                Sobre o produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {product.supplierProductDescription || product.description}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">Informações do Produto</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Código:</span>
                  <span className="font-medium">{product.code}</span>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">NCM:</span>
                  <span className="font-medium">{product.ncm}</span>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">GTIN/EAN:</span>
                  <span className="font-medium">{product.gtinEan}</span>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Estoque:</span>
                  <span className="font-medium">{product.stock} unidades</span>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Fornecedor:</span>
                  <span className="font-medium">{product.supplier}</span>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Disponível:</span>
                  <span className="font-medium">
                    {product.isActive ? 'Sim' : 'Não'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
