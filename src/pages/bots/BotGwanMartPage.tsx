import React from 'react';
import GwanMartChatWidget from '../../components/chat/GwanMartChatWidget';
import { useGwanMartChat } from '../../hooks/useGwanMartChat';
import Header from '../../components/layout/Header';
import env from '../../config/env';

const BotGwanMartPage: React.FC = () => {
  const { isOpen, toggleChat, openChat } = useGwanMartChat();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Compartilhado */}
      <Header showBackButton={true} backButtonText="Voltar ao Início" />

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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-5xl font-bold text-card-foreground mb-6">
            Chatbot Gwan Mart
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Seu assistente virtual especializado em e-commerce. Tire dúvidas
            sobre produtos, pedidos, entrega e muito mais!
          </p>
          <button
            onClick={openChat}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors duration-300"
          >
            Falar com o Atendente
          </button>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-3xl font-bold text-card-foreground mb-6">
              Sobre o Atendente Gwan Mart
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              Nosso chatbot está aqui para ajudá-lo com todas as suas
              necessidades de compra:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Informações sobre produtos e disponibilidade
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Acompanhamento de pedidos e entregas
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Políticas de troca e devolução
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Suporte técnico e dúvidas gerais
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Recomendações personalizadas
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Informações sobre promoções e ofertas
                </span>
              </li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Dica:</strong> Nosso atendente está disponível 24/7 para
                ajudá-lo com qualquer dúvida sobre nossos produtos e serviços.
              </p>
            </div>
          </div>
        </section>

        {/* Try Now Section */}
        <section className="mb-16">
          <div className="bg-gradient-primary rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Precisa de ajuda?
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6">
              Inicie uma conversa com nosso atendente virtual e obtenha
              respostas rápidas para suas dúvidas.
            </p>
            <button
              onClick={openChat}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Iniciar Atendimento
            </button>
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
                  Como faço para rastrear meu pedido?
                </h4>
                <p className="text-muted-foreground">
                  Você pode rastrear seu pedido através do código de
                  rastreamento enviado por email ou consultando diretamente com
                  nosso atendente.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Qual é o prazo de entrega?
                </h4>
                <p className="text-muted-foreground">
                  O prazo de entrega varia conforme a região e o tipo de
                  produto. Consulte nosso atendente para informações específicas
                  sobre seu pedido.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Posso trocar ou devolver um produto?
                </h4>
                <p className="text-muted-foreground">
                  Sim! Temos uma política de troca e devolução de 30 dias. Entre
                  em contato conosco para mais detalhes sobre o processo.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Quais formas de pagamento vocês aceitam?
                </h4>
                <p className="text-muted-foreground">
                  Aceitamos cartões de crédito, débito, PIX e boleto bancário.
                  Todas as transações são seguras e protegidas.
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
              © 2024 Gwan Mart. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <GwanMartChatWidget
        isOpen={isOpen}
        onToggle={toggleChat}
        chatbotName="Gwan Mart"
        chatbotIcon="🛒"
        chatbotColor="#10b981"
        endpoint={env.VITE_GWAN_MART_AI_URL}
      />
    </div>
  );
};

export default BotGwanMartPage;
