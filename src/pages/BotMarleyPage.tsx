import React from 'react'
import { Link } from 'react-router-dom'
import ChatWidget from '../components/chat/ChatWidget'
import { useChat } from '../hooks/useChat'
import Header from '../components/layout/Header'

const BotMarleyPage: React.FC = () => {
  const { isOpen, toggleChat, openChat } = useChat('https://n8n.gwan.com.br/webhook/ba654a7d-bbd1-4a88-b341-32d57c8007bc/chat')

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Compartilhado */}
      <Header showBackButton={true} backButtonText="Voltar ao Início" />

      {/* Main Content */}
      <main className="container py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-8 mx-auto">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold text-card-foreground mb-6">
            Chatbot do Empresário
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Obtenha informações sobre a carreira do Junior Dread, shows, turnês, rider técnico, próximas datas, informações para contratação e oportunidades de parceria.
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
            <h3 className="text-3xl font-bold text-card-foreground mb-6">Sobre este Chatbot</h3>
            <p className="text-muted-foreground text-lg mb-6">
              Este chatbot foi projetado para ajudá-lo com as seguintes tarefas:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">Informações e atualizações da carreira</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">Agenda de shows e turnês</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">Detalhes do rider técnico</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">Consultas sobre contratação e parcerias</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-muted-foreground">Próximas datas de apresentações</span>
              </li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Observação:</strong> Este chatbot fornece informações e orientações gerais. Para aconselhamento médico específico, consulte um profissional de saúde.
              </p>
            </div>
          </div>
        </section>

        {/* Try Now Section */}
        <section className="mb-16">
          <div className="bg-gradient-primary rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Experimente agora!
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6">
              Inicie uma conversa com nosso chatbot para obter ajuda instantânea.
            </p>
            <button 
              onClick={openChat}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Iniciar Conversa
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-3xl font-bold text-card-foreground mb-8">Perguntas Frequentes</h3>
            <div className="space-y-6">
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Como posso contratar o Junior Dread para um show?
                </h4>
                <p className="text-muted-foreground">
                  Para contratar o Junior Dread, por favor forneça detalhes sobre seu evento incluindo data, local e tamanho esperado do público.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  O que está incluído no rider técnico?
                </h4>
                <p className="text-muted-foreground">
                  O rider técnico inclui requisitos de sistema de som, configuração do palco, necessidades de iluminação e outras especificações técnicas para a apresentação.
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
  )
}

export default BotMarleyPage
