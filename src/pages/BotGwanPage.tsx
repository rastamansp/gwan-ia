import React from 'react'
import { Link } from 'react-router-dom'
import ChatWidget from '../components/chat/ChatWidget'
import { useChat } from '../hooks/useChat'

const BotGwanPage: React.FC = () => {
  const { isOpen, toggleChat, openChat } = useChat('https://n8n.gwan.com.br/webhook/020db69f-901b-4f90-aa26-1162cb551315/chat')

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3 text-primary hover:text-primary/80 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Voltar ao Início</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-card-foreground">BotGwan</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8 mx-auto">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold text-card-foreground mb-6">
            Chatbot de Conhecimento
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Acesse uma riqueza de informações e aprenda coisas novas com nosso assistente de IA experiente.
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
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">Respondendo perguntas de conhecimento geral</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">Fornecendo conteúdo educacional</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">Explicando tópicos complexos</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">Oferecendo recursos de aprendizado</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-muted-foreground">Apoiando pesquisa e estudo</span>
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
                  O que é integração de API?
                </h4>
                <p className="text-muted-foreground">
                  Integração de API é o processo de conectar diferentes aplicações de software através de suas APIs para compartilhar dados e funcionalidades.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Como posso melhorar o desempenho da minha API?
                </h4>
                <p className="text-muted-foreground">
                  Para melhorar o desempenho da API, implemente cache, otimize consultas ao banco de dados e use estruturas de dados eficientes.
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
  )
}

export default BotGwanPage