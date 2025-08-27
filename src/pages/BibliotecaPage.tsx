import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AppLayout from '../components/layout/AppLayout'

const BibliotecaPage: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Biblioteca 📚
          </h2>
          <p className="text-gray-400">
            Organize e gerencie todos os seus recursos de inteligência artificial em um só lugar.
          </p>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">12</div>
            <div className="text-gray-400 text-sm">Total de Recursos</div>
          </div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-green-400">8</div>
            <div className="text-gray-400 text-sm">Ativos</div>
          </div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">2.4GB</div>
            <div className="text-gray-400 text-sm">Espaço Usado</div>
          </div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">156</div>
            <div className="text-gray-400 text-sm">Usos Hoje</div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar recursos..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="all">Todos os Tipos</option>
              <option value="images">Imagens</option>
              <option value="audio">Áudio</option>
              <option value="video">Vídeo</option>
              <option value="text">Texto</option>
              <option value="assistants">Assistentes</option>
              <option value="prompts">Prompts</option>
            </select>
            <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="recent">Mais Recentes</option>
              <option value="oldest">Mais Antigos</option>
              <option value="name">Nome A-Z</option>
              <option value="size">Tamanho</option>
              <option value="usage">Mais Usados</option>
            </select>
          </div>
        </div>

        {/* Recursos por Categoria */}
        <div className="space-y-6">
          {/* Imagens */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                🖼️ Imagens
                <span className="ml-2 text-sm text-gray-400">(3 recursos)</span>
              </h3>
              <button className="text-purple-400 hover:text-purple-300 text-sm">Ver Todos</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="w-full h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mb-2"></div>
                <p className="text-white text-sm font-medium">Logo Empresarial</p>
                <p className="text-gray-400 text-xs">Criado há 2 dias</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="w-full h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mb-2"></div>
                <p className="text-white text-sm font-medium">Banner Promocional</p>
                <p className="text-gray-400 text-xs">Criado há 1 semana</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="w-full h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-2"></div>
                <p className="text-white text-sm font-medium">Ícone App</p>
                <p className="text-gray-400 text-xs">Criado há 3 dias</p>
              </div>
            </div>
          </div>

          {/* Áudio */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                🎵 Áudio
                <span className="ml-2 text-sm text-gray-400">(2 recursos)</span>
              </h3>
              <button className="text-purple-400 hover:text-purple-300 text-sm">Ver Todos</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="w-full h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mb-2 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium">Jingle Empresarial</p>
                <p className="text-gray-400 text-xs">30 segundos • MP3</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="w-full h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-2 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium">Podcast Intro</p>
                <p className="text-gray-400 text-xs">15 segundos • WAV</p>
              </div>
            </div>
          </div>

          {/* Assistentes */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                👤 Assistentes
                <span className="ml-2 text-sm text-gray-400">(2 recursos)</span>
              </h3>
              <button className="text-purple-400 hover:text-purple-300 text-sm">Ver Todos</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="w-full h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-2 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium">Assistente de Vendas</p>
                <p className="text-gray-400 text-xs">Ativo • 89 conversas</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="w-full h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mb-2 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium">Assistente de Suporte</p>
                <p className="text-gray-400 text-xs">Ativo • 67 conversas</p>
              </div>
            </div>
          </div>

          {/* Prompts */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                💡 Prompts
                <span className="ml-2 text-sm text-gray-400">(2 recursos)</span>
              </h3>
              <button className="text-purple-400 hover:text-purple-300 text-sm">Ver Todos</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="w-full h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium">Especialista em Marketing</p>
                <p className="text-gray-400 text-xs">23 usos • Marketing</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="w-full h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium">Escritor Criativo</p>
                <p className="text-gray-400 text-xs">18 usos • Escrita</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 rounded-lg text-center hover:from-purple-600 hover:to-blue-700 transition-all duration-200">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="font-medium">Novo Recurso</span>
            </button>
            
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-lg text-center hover:from-green-600 hover:to-blue-700 transition-all duration-200">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <span className="font-medium">Importar</span>
            </button>
            
            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-lg text-center hover:from-orange-600 hover:to-red-700 transition-all duration-200">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="font-medium">Exportar</span>
            </button>
            
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <span className="font-medium">Configurar</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default BibliotecaPage
