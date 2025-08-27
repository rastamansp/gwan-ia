import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AppLayout from '../components/layout/AppLayout'

const TraducoesPage: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Traduções 🌐
          </h2>
          <p className="text-gray-400">
            Traduza textos entre mais de 100 idiomas com inteligência artificial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Área de Tradução */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Traduzir Texto</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Idioma de Origem</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="pt">Português</option>
                  <option value="en">Inglês</option>
                  <option value="es">Espanhol</option>
                  <option value="fr">Francês</option>
                  <option value="de">Alemão</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Texto Original</label>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                  placeholder="Digite o texto que deseja traduzir..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Idioma de Destino</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="en">Inglês</option>
                  <option value="pt">Português</option>
                  <option value="es">Espanhol</option>
                  <option value="fr">Francês</option>
                  <option value="de">Alemão</option>
                </select>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                Traduzir
              </button>
            </div>
          </div>

          {/* Histórico de Traduções */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Histórico Recente</h3>
            
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-400">PT → EN</span>
                  <span className="text-xs text-gray-400">há 2 min</span>
                </div>
                <p className="text-white text-sm mb-1">Olá, como você está?</p>
                <p className="text-gray-300 text-sm">Hello, how are you?</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-400">EN → PT</span>
                  <span className="text-xs text-gray-400">há 15 min</span>
                </div>
                <p className="text-white text-sm mb-1">Thank you for your help</p>
                <p className="text-gray-300 text-sm">Obrigado pela sua ajuda</p>
              </div>

              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-400">ES → PT</span>
                  <span className="text-xs text-gray-400">há 1 hora</span>
                </div>
                <p className="text-white text-sm mb-1">¿Dónde está la biblioteca?</p>
                <p className="text-gray-300 text-sm">Onde fica a biblioteca?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Estatísticas de Tradução</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">1,247</div>
              <div className="text-gray-400 text-sm">Traduções Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">45</div>
              <div className="text-gray-400 text-sm">Idiomas Suportados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">98.7%</div>
              <div className="text-gray-400 text-sm">Precisão</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">2.3s</div>
              <div className="text-gray-400 text-sm">Tempo Médio</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default TraducoesPage
