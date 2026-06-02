import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  MessageCircle,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
} from 'lucide-react';
import { openWhatsApp, WhatsAppProductData } from '../../utils/whatsapp';
import Header from '../../components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MartProductCard from '../../components/MartProductCard';
import { useFeaturedProducts } from '../../hooks/useFeaturedProducts';

const stats = [
  { value: '500+', label: 'Produtos Vendidos', icon: TrendingUp },
  { value: '1.2k+', label: 'Clientes Satisfeitos', icon: Users },
  { value: '4.9', label: 'Avaliação Média', icon: Star },
];

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
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
        <div
          className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-secondary/40 blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />

        <div className="container relative z-10 mx-auto px-4 py-16 text-center">
          <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <ShoppingBag className="h-4 w-4" />
              Loja Online Premium
            </div>

            <h1 className="text-4xl font-bold text-foreground lg:text-6xl">
              Produtos{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Premium
              </span>
              <br />
              com Entrega Rápida
            </h1>

            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Encontre os melhores produtos tecnológicos com frete calculado,
              garantia completa e atendimento via WhatsApp.
            </p>

            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
              <Button
                size="lg"
                className="group text-lg shadow-glow-primary"
                asChild
              >
                <Link to="/gwan-mart/catalog">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Ver Produtos
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg"
                onClick={handleWhatsAppContact}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map(({ value, label, icon: Icon }) => (
            <Card
              key={label}
              className="border-2 bg-card/50 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-hover"
            >
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="bg-gradient-primary bg-clip-text text-3xl font-bold text-transparent">
                  {value}
                </h3>
                <p className="mt-1 text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Produtos em Destaque
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Confira nossa seleção especial de produtos com os melhores preços e
            condições de entrega.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            <span className="ml-4 text-muted-foreground">
              Carregando produtos...
            </span>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <div className="mb-4 text-destructive">
              ❌ Erro ao carregar produtos
            </div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products && Array.isArray(products) && products.length > 0 ? (
              products.map(product => (
                <MartProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <div className="mb-4 text-muted-foreground">
                  📦 Nenhum produto encontrado
                </div>
                <p className="text-sm text-muted-foreground">
                  Não há produtos em destaque no momento.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Tem Dúvidas? Fale Conosco!
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Nossa equipe está pronta para te ajudar via WhatsApp. Tire suas
            dúvidas sobre produtos, frete e garantias.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg"
            onClick={handleWhatsAppContact}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chamar no WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};

export default GwanMartPage;
