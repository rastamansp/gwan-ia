import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatVersion, getAppVersion } from '@/utils/version';
import Header from '../../components/layout/Header';

const HomePage: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Component */}
      <Header />

      {/* Disclaimer - Dicas de Navegação */}
      {showDisclaimer && (
        <section className="bg-muted/50 border-b border-border">
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
                        <Link
                          to="/gwan-legal"
                          className="text-primary hover:underline"
                        >
                          ⚖️ Gwan Legal
                        </Link>{' '}
                        - Automação jurídica
                      </li>
                      <li>
                        <span className="font-medium text-primary">
                          🤖 Chatbots
                        </span>{' '}
                        - Menu dropdown com nossos chatbots (Jaiminho, Marley,
                        Gwan, Gwan Mart, Bíblia)
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
                        <span className="font-medium">🎵 Marley</span> - Chatbot
                        sobre a carreira do Junior Dread e informações musicais
                      </li>
                      <li>
                        <span className="font-medium">🏢 Gwan</span> - Chatbot
                        institucional com informações sobre nossa empresa
                      </li>
                      <li>
                        <span className="font-medium">🛒 Gwan Mart</span> -
                        Atendente virtual especializado em e-commerce
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
      <main className="container py-20">
        {/* Seção Produtos */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-card-foreground mb-4">
              Nossos Produtos
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça nossas plataformas e soluções digitais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Gwan Mart */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 flex flex-col h-full">
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
              <h4 className="text-2xl font-bold text-card-foreground mb-4 text-center">
                Gwan Mart
              </h4>
              <p className="text-muted-foreground text-base mb-4 leading-relaxed flex-grow">
                Nossa loja online completa com produtos premium, atendimento
                virtual especializado em e-commerce e suporte 24/7. Explore
                produtos tecnológicos com frete calculado, garantia completa e
                atendimento via WhatsApp.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span>Catálogo completo de produtos</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span>Atendente virtual com IA</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span>Rastreamento de pedidos</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span>Suporte 24/7</span>
                </div>
              </div>
              <Link
                to="/gwan-mart"
                className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mt-auto text-center"
              >
                Acessar Gwan Mart
              </Link>
            </div>

            {/* Gwan Events */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 flex flex-col h-full">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-4 text-center">
                Gwan Events
              </h4>
              <p className="text-muted-foreground text-base mb-4 leading-relaxed flex-grow">
                Plataforma completa de gestão e participação em eventos. Acesse
                informações detalhadas sobre eventos, realize inscrições online,
                consulte agendas e programações, obtenha certificados e muito
                mais.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Informações sobre eventos</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Sistema de inscrições online</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Agenda e programação</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Certificados e materiais</span>
                </div>
              </div>
              <Link
                to="/gwan-events"
                className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mt-auto text-center"
              >
                Acessar Gwan Events
              </Link>
            </div>

            {/* Gwan Legal */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 flex flex-col h-full">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-4 text-center">
                Gwan Legal
              </h4>
              <p className="text-muted-foreground text-base mb-4 leading-relaxed flex-grow">
                <span className="font-semibold text-card-foreground">
                  O futuro do Direito brasileiro começa aqui.
                </span>{' '}
                Plataforma de automação jurídica inteligente que utiliza IA para
                gerar contratos, petições e documentos jurídicos com precisão e
                eficiência.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Geração de contratos com IA</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Criação de petições jurídicas</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Documentos jurídicos precisos</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Automação jurídica inteligente</span>
                </div>
              </div>
              <Link
                to="/gwan-legal"
                className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mt-auto text-center"
              >
                Acessar Gwan Legal
              </Link>
            </div>
          </div>
        </section>

        {/* Seção Experimente - Nossos Chatbots */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-card-foreground mb-4">
              Nossos Chatbots
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
