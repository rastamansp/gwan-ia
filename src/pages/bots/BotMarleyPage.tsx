import React, { useState } from 'react';
import ChatWidget from '../../components/chat/ChatWidget';
import { useChat } from '../../hooks/useChat';
import Header from '../../components/layout/Header';

const BotMarleyPage: React.FC = () => {
  const { isOpen, toggleChat, openChat } = useChat(
    'https://n8n.gwan.com.br/webhook/ba654a7d-bbd1-4a88-b341-32d57c8007bc/chat'
  );
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Compartilhado */}
      <Header showBackButton={true} backButtonText="Voltar ao Início" />

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
                  ℹ️ Sobre o Marley
                </h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Trata-se de um{' '}
                    <span className="font-medium text-primary">
                      Chatbot de Inteligência Artificial
                    </span>{' '}
                    especializado em informações sobre a{' '}
                    <span className="font-medium text-primary">
                      carreira musical
                    </span>{' '}
                    do{' '}
                    <span className="font-medium text-primary">
                      Junior Dread
                    </span>
                    , desenvolvido para fornecer orientações sobre shows,
                    turnês, rider técnico, próximas datas, informações para
                    contratação e oportunidades de parceria.
                  </p>
                  <p>
                    <span className="font-semibold text-card-foreground">
                      Exemplos de perguntas que você pode fazer:
                    </span>
                  </p>
                  <ul className="ml-4 space-y-1 list-disc">
                    <li>"Quais são os próximos shows do Junior Dread?"</li>
                    <li>
                      "Como posso contratar o Junior Dread para um evento?"
                    </li>
                    <li>
                      "Qual é o rider técnico necessário para as apresentações?"
                    </li>
                    <li>"Quando será a próxima turnê?"</li>
                  </ul>
                  <p className="pt-1">
                    <span className="font-semibold text-card-foreground">
                      🚀 Comece agora:
                    </span>{' '}
                    Clique em{' '}
                    <span className="font-medium text-primary">
                      "Experimentar"
                    </span>{' '}
                    e comece a se consultar com a IA!
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

      {/* Main Content */}
      <main className="container py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-8 mx-auto">
            <svg
              className="w-6 h-6 text-blue-600"
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
          <h2 className="text-5xl font-bold text-card-foreground mb-6">
            Administrador de Carreira Musical
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Obtenha informações sobre a carreira do Junior Dread, shows, turnês,
            rider técnico, próximas datas, informações para contratação e
            oportunidades de parceria.
          </p>
          <button
            onClick={openChat}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors duration-300"
          >
            Experimente agora!
          </button>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-3xl font-bold text-card-foreground mb-6">
              Sobre este Chatbot
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              Este chatbot foi projetado para ajudá-lo com as seguintes tarefas:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Informações e atualizações da carreira
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Agenda de shows e turnês
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Detalhes do rider técnico
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Consultas sobre contratação e parcerias
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Próximas datas de apresentações
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-3xl font-bold text-card-foreground mb-8">
              Perguntas Frequentes
            </h3>
            <div className="space-y-6">
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Como posso contratar o Junior Dread para um show?
                </h4>
                <p className="text-muted-foreground">
                  Para contratar o Junior Dread, por favor forneça detalhes
                  sobre seu evento incluindo data, local e tamanho esperado do
                  público.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  O que está incluído no rider técnico?
                </h4>
                <p className="text-muted-foreground">
                  O rider técnico inclui requisitos de sistema de som,
                  configuração do palco, necessidades de iluminação e outras
                  especificações técnicas para a apresentação.
                </p>
              </div>
            </div>
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

      {/* Chat Widget */}
      <ChatWidget
        isOpen={isOpen}
        onToggle={toggleChat}
        chatbotName="BotMarley"
        chatbotIcon="😊"
        chatbotColor="#3b82f6"
        endpoint="https://n8n.gwan.com.br/webhook/ba654a7d-bbd1-4a88-b341-32d57c8007bc/chat"
      />
    </div>
  );
};

export default BotMarleyPage;
