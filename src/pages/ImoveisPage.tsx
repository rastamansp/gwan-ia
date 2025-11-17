import React from 'react';
import Header from '../components/layout/Header';

const ImoveisPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Compartilhado */}
      <Header showBackButton={true} backButtonText="Voltar ao Início" />

      {/* Main Content */}
      <main className="container py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-8 mx-auto">
            <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h2 className="text-5xl font-bold text-card-foreground mb-6">
            Gwan Imóveis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Plataforma completa de imóveis. Encontre o imóvel dos seus sonhos,
            venda ou alugue com facilidade e segurança!
          </p>
          <a
            href="https://imoveis.gwan.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors duration-300"
          >
            Acessar Plataforma de Imóveis
            <svg
              className="w-5 h-5 inline-block ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-3xl font-bold text-card-foreground mb-6">
              O que você encontra na plataforma
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              A plataforma Gwan Imóveis oferece uma experiência completa para
              compra, venda e aluguel de imóveis:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Busca avançada de imóveis
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Filtros por localização, preço e características
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Galeria de fotos e vídeos dos imóveis
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Agendamento de visitas online
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Anúncios para venda e aluguel
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Suporte e atendimento especializado
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Avaliações e recomendações
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Documentação e processos seguros
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container py-12">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Gwan Company. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ImoveisPage;
