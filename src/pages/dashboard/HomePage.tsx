import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';
import Header from '../../components/layout/Header';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Products from '../../components/Products';
import Chatbots from '../../components/Chatbots';
import Footer from '../../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Diferenciais */}
      <Features />

      {/* Products Section */}
      <Products />

      {/* Chatbots Section */}
      <Chatbots />

      {/* Call-to-Action Section */}
      <section className="relative overflow-hidden border-t border-border bg-card py-24">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative z-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Rocket className="h-4 w-4" />
            Comece agora, é grátis
          </div>
          <h3 className="mb-6 text-4xl font-bold text-card-foreground md:text-5xl">
            Pronto para Revolucionar sua{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Produtividade?
            </span>
          </h3>
          <p className="mx-auto mb-12 max-w-3xl text-xl text-muted-foreground">
            Crie, inove e acelere seus projetos com inteligência artificial.
            Comece em minutos, sem cartão de crédito.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register-account"
              className="group flex items-center gap-2 rounded-lg bg-gradient-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:shadow-glow-primary"
            >
              Começar Gratuitamente
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/auth"
              className="rounded-lg border border-border px-8 py-4 text-lg font-semibold text-card-foreground transition-colors duration-300 hover:bg-muted"
            >
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
