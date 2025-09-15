import React from 'react';
import { Link } from 'react-router-dom';
import { openWhatsApp, WhatsAppProductData } from '../../utils/whatsapp';
import Header from '../../components/layout/Header';
import { useFeaturedProducts } from '../../hooks/useFeaturedProducts';

const GwanMartPage: React.FC = () => {
  const { products, loading, error } = useFeaturedProducts();

  const handleWhatsAppContact = () => {
    const contactData: WhatsAppProductData = {
      id: 'gwan-mart-contato',
      name: 'Contato Gwan Mart',
      quantity: 1,
      origin: 'São Paulo - SP',
    };

    openWhatsApp(contactData);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
            🚀 Loja Online Premium
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
            Produtos{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Premium
            </span>
            <br />
            com Entrega Rápida
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre os melhores produtos tecnológicos com frete calculado,
            garantia completa e atendimento via WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gwan-mart/catalog"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-11 rounded-md px-8 bg-primary hover:bg-primary/90 shadow-medium"
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
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Ver Produtos
            </Link>

            <button
              onClick={handleWhatsAppContact}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 shadow-soft"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-lg border text-card-foreground shadow-sm text-center bg-gradient-card shadow-soft">
            <div className="p-6">
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
                className="h-12 w-12 text-primary mx-auto mb-4"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              <h3 className="text-2xl font-bold text-foreground">500+</h3>
              <p className="text-muted-foreground">Produtos Vendidos</p>
            </div>
          </div>

          <div className="rounded-lg border text-card-foreground shadow-sm text-center bg-gradient-card shadow-soft">
            <div className="p-6">
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
                className="h-12 w-12 text-success mx-auto mb-4"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <h3 className="text-2xl font-bold text-foreground">1.2k+</h3>
              <p className="text-muted-foreground">Clientes Satisfeitos</p>
            </div>
          </div>

          <div className="rounded-lg border text-card-foreground shadow-sm text-center bg-gradient-card shadow-soft">
            <div className="p-6">
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
                className="h-12 w-12 text-yellow-500 mx-auto mb-4"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
              <h3 className="text-2xl font-bold text-foreground">4.9</h3>
              <p className="text-muted-foreground">Avaliação Média</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confira nossa seleção especial de produtos com os melhores preços e
            condições de entrega.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-4 text-muted-foreground">
              Carregando produtos...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-destructive mb-4">
              ❌ Erro ao carregar produtos
            </div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <Link
                key={product.id}
                to={`/gwan-mart/product/${product.id}`}
                className="group block"
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105 overflow-hidden relative">
                  {/* Product Image Container */}
                  <div className="relative">
                    <img
                      src={product.thumbnail}
                      alt={
                        product.name ||
                        product.description ||
                        `Produto ${product.code}`
                      }
                      className="w-full h-48 object-cover"
                    />

                    {/* Favorite Button - Top Right */}
                    <button
                      className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        // TODO: Implementar favoritos
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    {/* MAIS VENDIDO Badge */}
                    <div className="inline-block">
                      <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        MAIS VENDIDO
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name ||
                        product.description ||
                        `Produto ${product.code}`}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-900">
                        {product.formattedRating || '4.9'}
                      </span>
                      <div className="flex text-blue-500">
                        {Array.from({ length: 5 }, (_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 fill-current"
                            viewBox="0 0 15 15"
                          >
                            <path d="M7.5 0L9.5 5.5L15 5.5L10.5 9L12 15L7.5 11.5L3 15L4.5 9L0 5.5L5.5 5.5L7.5 0Z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.totalReviews || '2866'})
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="space-y-1">
                      {/* Original Price */}
                      {product.discountPercentage > 0 && (
                        <div className="text-sm text-gray-500 line-through">
                          R${' '}
                          {(product.originalPrice || 0).toLocaleString('pt-BR')}
                        </div>
                      )}

                      {/* Current Price with Discount */}
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          R${' '}
                          {(
                            product.promotionalPrice ||
                            product.currentPrice ||
                            0
                          ).toLocaleString('pt-BR')}
                        </span>
                        {product.discountPercentage > 0 && (
                          <span className="text-sm font-semibold text-green-600">
                            {product.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Tem Dúvidas? Fale Conosco!
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para te ajudar via WhatsApp. Tire suas
            dúvidas sobre produtos, frete e garantias.
          </p>
          <button
            onClick={handleWhatsAppContact}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-11 rounded-md px-8 shadow-medium"
          >
            Chamar no WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
};

export default GwanMartPage;
