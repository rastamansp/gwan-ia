import React, { useState } from 'react';
import ChatWidget from '../../components/chat/ChatWidget';
import { useChat } from '../../hooks/useChat';
import Header from '../../components/layout/Header';

const BotGwanImoveisPage: React.FC = () => {
  const { isOpen, toggleChat, openChat } = useChat(
    'https://api-events.gwan.com.br/ap/api/chat'
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
                  ℹ️ Sobre o Gwan Imóveis
                </h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Trata-se de um{' '}
                    <span className="font-medium text-primary">
                      Chatbot de Inteligência Artificial
                    </span>{' '}
                    <span className="font-medium text-primary">
                      especializado em imóveis
                    </span>
                    , desenvolvido para fornecer informações sobre imóveis
                    disponíveis, características de propriedades, localização,
                    preços, agendamento de visitas e processos de compra, venda
                    e aluguel. Utilize nossa base de conhecimento para obter
                    respostas sobre o mercado imobiliário.
                  </p>
                  <p>
                    <span className="font-semibold text-card-foreground">
                      Exemplos de perguntas que você pode fazer:
                    </span>
                  </p>
                  <ul className="ml-4 space-y-1 list-disc">
                    <li>"Quais imóveis estão disponíveis para venda?"</li>
                    <li>"Como agendar uma visita?"</li>
                    <li>
                      "Quais são os documentos necessários para comprar um
                      imóvel?"
                    </li>
                    <li>"Quais são as características do imóvel?"</li>
                    <li>"Qual o valor do financiamento?"</li>
                  </ul>
                  <p className="pt-1">
                    <span className="font-semibold text-card-foreground">
                      🚀 Comece agora:
                    </span>{' '}
                    Clique em{' '}
                    <span className="font-medium text-primary">
                      "Experimentar"
                    </span>{' '}
                    e comece a conversar com nosso assistente de imóveis!
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
            Chatbot Gwan Imóveis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Seu assistente virtual especializado em imóveis. Tire dúvidas sobre
            propriedades, processos de compra e venda, financiamento e muito
            mais!
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
              Este chatbot foi projetado para ajudá-lo com as seguintes tarefas
              relacionadas a imóveis:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Buscar imóveis disponíveis para compra e aluguel
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Informações sobre características dos imóveis
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Agendamento de visitas
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Informações sobre financiamento e documentação
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Processos de compra, venda e aluguel
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Dúvidas sobre localização e vizinhança
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
                  Como posso buscar imóveis disponíveis?
                </h4>
                <p className="text-muted-foreground">
                  Você pode perguntar ao chatbot sobre imóveis por localização,
                  tipo (casa, apartamento, terreno), preço ou características
                  específicas. O assistente irá ajudá-lo a encontrar as melhores
                  opções.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Como agendar uma visita?
                </h4>
                <p className="text-muted-foreground">
                  Basta perguntar ao chatbot sobre agendamento de visitas. Ele
                  irá orientá-lo sobre os horários disponíveis e como proceder
                  com o agendamento.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Quais documentos são necessários para comprar um imóvel?
                </h4>
                <p className="text-muted-foreground">
                  O chatbot pode fornecer informações sobre a documentação
                  necessária para compra, venda e aluguel de imóveis, incluindo
                  documentos pessoais, comprovantes e certidões.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  O chatbot pode ajudar com financiamento?
                </h4>
                <p className="text-muted-foreground">
                  Sim! O assistente pode fornecer informações sobre opções de
                  financiamento, condições, taxas e requisitos para
                  financiamento imobiliário.
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
        chatbotName="Gwan Imóveis"
        chatbotIcon="🏠"
        chatbotColor="#3b82f6"
        endpoint="https://api-events.gwan.com.br/ap/api/chat"
      />
    </div>
  );
};

export default BotGwanImoveisPage;
