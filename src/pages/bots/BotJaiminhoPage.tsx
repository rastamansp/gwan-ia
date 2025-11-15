import React, { useState } from 'react';
import ChatWidget from '../../components/chat/ChatWidget';
import { useChat } from '../../hooks/useChat';
import Header from '../../components/layout/Header';
import env from '../../config/env';

const BotJaiminhoPage: React.FC = () => {
  const { isOpen, toggleChat, openChat } = useChat(
    env.VITE_CHAT_HEALTH_API_URL
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
                  ℹ️ Sobre o Jaiminho
                </h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Trata-se de um{' '}
                    <span className="font-medium text-primary">
                      Chatbot de Inteligência Artificial
                    </span>{' '}
                    especializado em{' '}
                    <span className="font-medium text-primary">
                      naturopatia
                    </span>
                    , desenvolvido para fornecer orientações sobre bem-estar e
                    saúde. O chatbot utiliza uma base de conhecimento (
                    <span className="font-medium text-primary">RAG</span>)
                    fundamentada na obra do renomado{' '}
                    <span className="font-medium text-primary">
                      Jaime Bruning
                    </span>
                    , terapeuta naturopata reconhecido, oferecendo sugestões e
                    tratamentos naturais baseados em sintomas e doenças
                    apresentadas.
                  </p>
                  <p>
                    <span className="font-semibold text-card-foreground">
                      Exemplos de perguntas que você pode fazer:
                    </span>
                  </p>
                  <ul className="ml-4 space-y-1 list-disc">
                    <li>"Estou com dor de barriga, o que pode ser?"</li>
                    <li>"Como posso tratar prisão de ventre?"</li>
                    <li>
                      "Quais são os sintomas de ansiedade e como tratá-los
                      naturalmente?"
                    </li>
                    <li>"Qual o melhor chá para dores de cabeça?"</li>
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
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 mx-auto">
            <svg
              className="w-6 h-6 text-green-600"
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
          <h2 className="text-5xl font-bold text-card-foreground mb-6">
            Chatbot de Saúde
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Obtenha informações de saúde instantâneas e dicas de bem-estar do
            nosso assistente de saúde com IA.
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
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Informações gerais de saúde
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Dicas de bem-estar
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Recomendações de estilo de vida saudável
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Orientação médica básica
                </span>
              </li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Observação:</strong> Este chatbot fornece informações e
                orientações gerais. Para aconselhamento médico específico,
                consulte um profissional de saúde.
              </p>
            </div>
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
                  Quais são os sintomas comuns de um resfriado?
                </h4>
                <p className="text-muted-foreground">
                  Os sintomas comuns do resfriado incluem coriza, dor de
                  garganta, tosse e febre leve.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Como posso prevenir a gripe?
                </h4>
                <p className="text-muted-foreground">
                  Para prevenir a gripe, tome a vacina anualmente, lave as mãos
                  com frequência e mantenha boa higiene.
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
        chatbotName="BotJaiminho"
        chatbotIcon="🌿"
        chatbotColor="#10b981"
        endpoint={env.VITE_CHAT_HEALTH_API_URL}
      />
    </div>
  );
};

export default BotJaiminhoPage;
