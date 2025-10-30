import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  showBackButton?: boolean;
  backButtonText?: string;
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  backButtonText = 'Voltar ao Início',
}) => {
  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="container">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Link
                to="/"
                className="flex items-center space-x-3 text-primary hover:text-primary/80 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="font-medium">{backButtonText}</span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-card-foreground">
                Gwan IA
              </h1>
            </Link>
          </div>

          <nav className="flex space-x-8">
            <Link to="/" className="text-primary font-medium">
              🏠 Home
            </Link>

            {/* Menu Dropdown de Produtos */}
            <div className="relative group">
              <button className="text-muted-foreground hover:text-primary font-medium flex items-center gap-1 transition-colors duration-200 whitespace-nowrap">
                📦 Produtos
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    to="/gwan-mart"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    🛒 Gwan Mart - Loja Online
                  </Link>
                  <Link
                    to="/gwan-events"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    📅 Gwan Events - Plataforma de Eventos
                  </Link>
                  <Link
                    to="/gwan-legal"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    ⚖️ Gwan Legal - Automação Jurídica
                  </Link>
                </div>
              </div>
            </div>

            {/* Menu Dropdown de Chatbots */}
            <div className="relative group">
              <button className="text-muted-foreground hover:text-primary font-medium flex items-center gap-1 transition-colors duration-200 whitespace-nowrap">
                🤖 Chatbots
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    to="/bot-jaiminho"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    🌿 Jaiminho - Naturopata
                  </Link>
                  <Link
                    to="/bot-marley"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    🎵 Marley - Músico
                  </Link>
                  <Link
                    to="/bot-gwan"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    🏢 Gwan - Institucional
                  </Link>
                  <Link
                    to="/bot-gwan-mart"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    🛒 Gwan Mart - E-commerce
                  </Link>
                  <Link
                    to="/bot-biblia"
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    📖 Bíblia - Geração de Vídeo
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/auth"
              className="text-muted-foreground hover:text-primary font-medium"
            >
              🔐 Entrar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
