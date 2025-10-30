import React, { useState } from 'react';
import ChatWidget from '../../components/chat/ChatWidget';
import { useChat } from '../../hooks/useChat';
import Header from '../../components/layout/Header';

const BotGwanPage: React.FC = () => {
  const { isOpen, toggleChat, openChat } = useChat(
    'https://n8n.gwan.com.br/webhook/020db69f-901b-4f90-aa26-1162cb551315/chat'
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
                  ℹ️ Sobre o Gwan
                </h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Trata-se de um{' '}
                    <span className="font-medium text-primary">
                      Chatbot de Inteligência Artificial
                    </span>{' '}
                    <span className="font-medium text-primary">
                      institucional
                    </span>
                    , desenvolvido para fornecer informações sobre nossa
                    empresa, detalhes de contato, parcerias e serviços de
                    desenvolvimento de Chatbot de IA e inovação tecnológica.
                    Utilize nossa base de conhecimento para obter respostas
                    sobre nossos produtos e soluções.
                  </p>
                  <p>
                    <span className="font-semibold text-card-foreground">
                      Exemplos de perguntas que você pode fazer:
                    </span>
                  </p>
                  <ul className="ml-4 space-y-1 list-disc">
                    <li>"Quais são os serviços oferecidos pela Gwan?"</li>
                    <li>"Como posso entrar em contato com vocês?"</li>
                    <li>"Vocês fazem parcerias?"</li>
                    <li>
                      "Como funciona o desenvolvimento de chatbots de IA?"
                    </li>
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
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8 mx-auto">
            <svg
              className="w-6 h-6 text-gray-600"
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
          <h2 className="text-5xl font-bold text-card-foreground mb-6">
            Chatbot de Conhecimento
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Acesse uma riqueza de informações e aprenda coisas novas com nosso
            assistente de IA experiente.
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
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Respondendo perguntas de conhecimento geral
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Fornecendo conteúdo educacional
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Explicando tópicos complexos
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Oferecendo recursos de aprendizado
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Apoiando pesquisa e estudo
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
                  O que é Consultoria de Arquitetura de IA?
                </h4>
                <p className="text-muted-foreground">
                  Consultoria de Arquitetura de IA é o processo de planejar e
                  estruturar soluções de inteligência artificial que atendam às
                  necessidades específicas do seu negócio, considerando
                  escalabilidade, performance e integração com sistemas
                  existentes.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Como a Gwan pode ajudar na arquitetura de IA para minha
                  empresa?
                </h4>
                <p className="text-muted-foreground">
                  A Gwan oferece consultoria especializada para projetar
                  arquiteturas de IA personalizadas, incluindo análise de
                  requisitos, seleção de tecnologias adequadas, definição de
                  pipelines de dados e estratégias de implementação e
                  manutenção.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Quais tecnologias de IA a Gwan utiliza?
                </h4>
                <p className="text-muted-foreground">
                  Trabalhamos com diversas tecnologias de IA, incluindo modelos
                  de linguagem (LLMs), sistemas RAG (Retrieval-Augmented
                  Generation), processamento de linguagem natural (NLP), machine
                  learning e arquiteturas híbridas conforme as necessidades do
                  projeto.
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
        chatbotName="BotGwan"
        chatbotIcon="🏢"
        chatbotColor="#6b7280"
        endpoint="https://n8n.gwan.com.br/webhook/020db69f-901b-4f90-aa26-1162cb551315/chat"
      />
    </div>
  );
};

export default BotGwanPage;
