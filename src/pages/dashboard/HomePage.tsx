import React from 'react';
import { Link } from 'react-router-dom';
import { formatVersion, getAppVersion } from '@/utils/version';
import Header from '../../components/layout/Header';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <main className="container py-20">
        {/* Seção Experimente - Nossos Produtos */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-card-foreground mb-4">
              Nossos Produtos
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça nossos chatbots especializados e soluções de IA
              personalizadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Jaiminho */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 text-center flex flex-col h-full">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-4">
                Jaiminho
              </h4>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed flex-grow">
                Seu médico naturopata, fornecendo informações sobre causas,
                sintomas e tratamentos naturais para doenças do século XXI.
              </p>
              <Link
                to="/bot-jaiminho"
                className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mt-auto"
              >
                Experimentar
              </Link>
            </div>

            {/* Marley */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 text-center flex flex-col h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-4">
                Marley
              </h4>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed flex-grow">
                Obtenha informações sobre a carreira do Junior Dread, shows,
                turnês, rider técnico, próximas datas, informações para
                contratação e oportunidades de parceria.
              </p>
              <Link
                to="/bot-marley"
                className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mt-auto"
              >
                Experimentar
              </Link>
            </div>

            {/* Gwan */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 text-center flex flex-col h-full">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-4">
                Gwan
              </h4>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed flex-grow">
                Nosso chatbot institucional, fornecendo informações sobre a
                empresa, detalhes de contato, parcerias e serviços de
                desenvolvimento de Chatbot de IA e inovação tecnológica.
              </p>
              <Link
                to="/bot-gwan"
                className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mt-auto"
              >
                Experimentar
              </Link>
            </div>

            {/* Gwan Mart */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 text-center flex flex-col h-full">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-4">
                Gwan Mart
              </h4>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed flex-grow">
                Atendente virtual especializado em e-commerce. Tire dúvidas
                sobre produtos, pedidos, entrega e muito mais!
              </p>
              <Link
                to="/bot-gwan-mart"
                className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mt-auto"
              >
                Experimentar
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Call-to-Action Section */}
      <section className="bg-card border-t border-border py-20">
        <div className="container text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
            Pronto para Revolucionar sua Produtividade?
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Junte-se a milhares de usuários que já estão usando nossa plataforma
            para criar, inovar e acelerar seus projetos com inteligência
            artificial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register-account"
              className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 flex items-center gap-2 group"
            >
              Começar Gratuitamente
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            <button className="bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-colors duration-300 border border-border">
              Ver Demonstração
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container py-12">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Gwan Company. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground/80 mt-2">
              {formatVersion(getAppVersion())}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
