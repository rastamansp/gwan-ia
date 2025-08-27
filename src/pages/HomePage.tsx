import React from 'react'
import { Link } from 'react-router-dom'
import { formatVersion } from '@/utils/version'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header with navigation links */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-card-foreground">Gwan IA</h1>
            </div>
            
            <nav className="flex space-x-8">
              <Link to="/" className="text-primary font-medium">🏠 Home</Link>
              <Link to="/theme" className="text-muted-foreground hover:text-primary font-medium">🎨 Tema</Link>
              <Link to="/auth" className="text-muted-foreground hover:text-primary font-medium">🔐 Auth</Link>
              <Link to="/register-account" className="text-muted-foreground hover:text-primary font-medium">📝 Registro</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-card-foreground mb-6">
            Ferramentas Poderosas de IA
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Acesse um conjunto completo de ferramentas de inteligência artificial projetadas para acelerar seu trabalho e criatividade.
          </p>
        </div>

                 {/* Seção de Ferramentas Poderosas de IA */}
         <section className="mb-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Chatbot Inteligente */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-card-foreground mb-2">Chatbot Inteligente</h4>
              <p className="text-muted-foreground text-sm mb-4">Conversas naturais com IA avançada</p>
              <div className="text-card-foreground text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                Experimentar →
              </div>
            </div>

            {/* Tradução Automática */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-card-foreground mb-2">Tradução Automática</h4>
              <p className="text-muted-foreground text-sm mb-4">Traduza entre 100+ idiomas instantaneamente</p>
              <div className="text-card-foreground text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                Experimentar →
              </div>
            </div>

            {/* Geração de Imagens */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-card-foreground mb-2">Geração de Imagens</h4>
              <p className="text-muted-foreground text-sm mb-4">Crie imagens únicas com descrições de texto</p>
              <div className="text-card-foreground text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                Experimentar →
              </div>
            </div>

            {/* Geração de Vídeos */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-card-foreground mb-2">Geração de Vídeos</h4>
              <p className="text-muted-foreground text-sm mb-4">Produza vídeos impressionantes com IA</p>
              <div className="text-card-foreground text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                Experimentar →
              </div>
            </div>
          </div>
        </section>

        {/* Seção Experimente - Nossos Produtos */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-card-foreground mb-4">
              Nossos Produtos
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça nossos chatbots especializados e soluções de IA personalizadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Jaiminho */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-4">Jaiminho</h4>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                Seu médico naturopata, fornecendo informações sobre causas, sintomas e tratamentos naturais para doenças do século XXI.
              </p>
              <Link to="/bot-jaiminho" className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300">
                Experimentar
              </Link>
            </div>

            {/* Marley */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-4">Marley</h4>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                Obtenha informações sobre a carreira do Junior Dread, shows, turnês, rider técnico, próximas datas, informações para contratação e oportunidades de parceria.
              </p>
              <Link to="/bot-marley" className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300">
                Experimentar
              </Link>
            </div>

            {/* Gwan */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-border/80 transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-card-foreground mb-4">Gwan</h4>
              <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                Nosso chatbot institucional, fornecendo informações sobre a empresa, detalhes de contato, parcerias e serviços de desenvolvimento de Chatbot de IA e inovação tecnológica.
              </p>
              <Link to="/bot-gwan" className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300">
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
            Junte-se a milhares de usuários que já estão usando nossa plataforma para criar, inovar e acelerar seus projetos com inteligência artificial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register-account" className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-glow-primary transition-all duration-300 flex items-center gap-2 group">
              Começar Gratuitamente
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <button className="bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary/80 transition-colors duration-300 border border-border">
              Ver Demonstração
            </button>
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
               {formatVersion()}
             </p>
           </div>
         </div>
       </footer>
    </div>
  )
}

export default HomePage
