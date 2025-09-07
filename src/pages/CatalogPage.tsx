import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import { useAllProducts } from '../hooks/useAllProducts';

const CatalogPage: React.FC = () => {
  const { products, loading, error } = useAllProducts();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
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

      <main className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 scroll-reveal">
            <h2 className="text-2xl font-semibold gradient-text mb-2">
              Catálogo Completo
            </h2>
            <p className="text-muted-foreground">
              {loading
                ? 'Carregando...'
                : `${products.length} produtos encontrados`}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map(product => (
                <Link
                  key={product.id}
                  to={`/gwan-mart/product/${product.id}`}
                  className="group"
                >
                  <div className="product-card p-4 cursor-pointer scroll-reveal bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 group-hover:scale-[1.02] rounded-lg border text-card-foreground">
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      {product.discountPercentage > 0 && (
                        <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-semibold">
                          -{product.discountPercentage}%
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-semibold">
                        Novo
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {product.discountPercentage > 0 && (
                          <span className="text-muted-foreground text-sm line-through">
                            {product.formattedOriginalPrice}
                          </span>
                        )}
                        <span className="gradient-text text-lg font-bold">
                          {product.formattedCurrentPrice}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <div className="flex text-yellow-400">
                            {renderStars(product.averageRating)}
                          </div>
                          <span>{product.formattedRating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
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
                            className="h-3 w-3"
                          >
                            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                            <path d="M15 18H9"></path>
                            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                            <circle cx="17" cy="18" r="2"></circle>
                            <circle cx="7" cy="18" r="2"></circle>
                          </svg>
                          <span className="text-xs">Frete grátis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CatalogPage;
