import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Hero from '../../components/Hero';
import Products from '../../components/Products';
import Chatbots from '../../components/Chatbots';
import Footer from '../../components/Footer';

const HomePage: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Component */}
      <Header />

      {/* Disclaimer - Dicas de Navegação */}
      {showDisclaimer && (
        <section className="bg-muted/50 border-b border-border mt-16 mb-0">
          <div className="container py-5">
            <div className="flex items-start gap-3 max-w-7xl mx-auto relative">
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 pr-8">
                <h4 className="text-sm font-semibold text-card-foreground mb-2">
                  💡 Dicas de Navegação
                </h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div>
                    <span className="font-semibold text-card-foreground">
                      Menu de Navegação:
                    </span>
                    <ul className="ml-4 mt-1 space-y-1 list-disc">
                      <li>
                        <Link to="/" className="text-primary hover:underline">
                          🏠 Home
                        </Link>{' '}
                        - Página inicial
                      </li>
                      <li>
                        <Link
                          to="/gwan-mart"
                          className="text-primary hover:underline"
                        >
                          🛒 Gwan Mart
                        </Link>{' '}
                        - Nossa loja online
                      </li>
                      <li>
                        <Link
                          to="/gwan-events"
                          className="text-primary hover:underline"
                        >
                          📅 Gwan Events
                        </Link>{' '}
                        - Plataforma de eventos
                      </li>
                      <li>
                        <span className="font-medium text-primary">
                          🤖 Chatbots
                        </span>{' '}
                        - Menu dropdown com nossos chatbots (Jaiminho, Gwan Mart,
                        Gwan Imóveis, Gwan Events)
                      </li>
                      <li>
                        <Link
                          to="/auth"
                          className="text-primary hover:underline"
                        >
                          🔐 Entrar
                        </Link>{' '}
                        - Acesse sua conta
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-semibold text-card-foreground">
                      Nossos Chatbots:
                    </span>
                    <ul className="ml-4 mt-1 space-y-1 list-disc">
                      <li>
                        <span className="font-medium">🌿 Jaiminho</span> -
                        Chatbot naturopata especializado em tratamentos naturais
                      </li>
                      <li>
                        <span className="font-medium">🛒 Gwan Mart</span> -
                        Atendente virtual especializado em e-commerce
                      </li>
                      <li>
                        <span className="font-medium">🏠 Gwan Imóveis</span> -
                        Assistente virtual especializado em imóveis. Busque
                        propriedades, tire dúvidas sobre compra, venda e aluguel
                      </li>
                      <li>
                        <span className="font-medium">📅 Gwan Events</span> -
                        Assistente virtual especializado em eventos. Busque
                        eventos, tire dúvidas sobre inscrições e programações
                      </li>
                    </ul>
                  </div>
                  <p className="pt-1">
                    <span className="font-semibold text-card-foreground">
                      💡 Dica:
                    </span>{' '}
                    Ao clicar no botão{' '}
                    <span className="font-medium text-primary">
                      "Experimentar"
                    </span>{' '}
                    em qualquer produto abaixo, você será direcionado para o
                    chatbot respectivo onde poderá interagir e testar suas
                    funcionalidades.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="absolute top-0 right-0 text-muted-foreground hover:text-card-foreground transition-colors duration-200 p-1 rounded-md hover:bg-muted"
                aria-label="Fechar dicas de navegação"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <Products />

      {/* Chatbots Section */}
      <Chatbots />

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
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
