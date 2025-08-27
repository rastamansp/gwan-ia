import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AppLayout from '../components/layout/AppLayout'

const AssistentesPage: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Assistentes Personalizados 👤
          </h2>
          <p className="text-gray-400">
            Crie e gerencie assistentes de IA personalizados para diferentes propósitos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Criar Novo Assistente */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Criar Novo Assistente</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Assistente</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ex: Assistente de Vendas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="sales">Vendas</option>
                  <option value="support">Suporte</option>
                  <option value="education">Educação</option>
                  <option value="health">Saúde</option>
                  <option value="finance">Finanças</option>
                  <option value="legal">Jurídico</option>
                  <option value="creative">Criativo</option>
                  <option value="custom">Personalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Personalidade</label>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Descreva como o assistente deve se comportar..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Conhecimentos</label>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Quais conhecimentos o assistente deve ter?"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                ✨ Criar Assistente
              </button>
            </div>
          </div>

          {/* Assistentes Existentes */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Seus Assistentes</h3>
            
            <div className="space-y-3">
              {/* Assistente de Vendas */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Assistente de Vendas</h4>
                      <p className="text-gray-400 text-sm">Vendas e Marketing</p>
                    </div>
                  </div>
                  <span className="text-green-400 text-xs bg-green-900/20 px-2 py-1 rounded-full">Ativo</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Configurar</button>
                  <button className="text-green-400 hover:text-green-300 text-sm">Testar</button>
                  <button className="text-red-400 hover:text-red-300 text-sm">Pausar</button>
                </div>
              </div>

              {/* Assistente de Suporte */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Assistente de Suporte</h4>
                      <p className="text-gray-400 text-sm">Atendimento ao Cliente</p>
                    </div>
                  </div>
                  <span className="text-green-400 text-xs bg-green-900/20 px-2 py-1 rounded-full">Ativo</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Configurar</button>
                  <button className="text-green-400 hover:text-green-300 text-sm">Testar</button>
                  <button className="text-red-400 hover:text-red-300 text-sm">Pausar</button>
                </div>
              </div>

              {/* Botão para criar mais */}
              <div className="bg-gray-700 rounded-lg p-4 text-center border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors duration-200 cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Criar Novo Assistente</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Estatísticas dos Assistentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">2</div>
              <div className="text-gray-400 text-sm">Total de Assistentes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">2</div>
              <div className="text-gray-400 text-sm">Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">156</div>
              <div className="text-gray-400 text-sm">Conversas Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">94%</div>
              <div className="text-gray-400 text-sm">Taxa de Satisfação</div>
            </div>
          </div>
        </div>

        {/* Templates */}
        <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Templates Recomendados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Assistente de Vendas</h4>
              <p className="text-gray-400 text-sm">Ideal para e-commerce e vendas</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.604l-.707.707a1 1 0 01-1.414 0L9.172 2.604M12 21.396l.707-.707a1 1 0 011.414 0l.707.707M2.604 12l.707.707a1 1 0 001.414 0L2.604 12m18.792 0l-.707-.707a1 1 0 00-1.414 0L21.396 12" />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Assistente Educacional</h4>
              <p className="text-gray-400 text-sm">Para tutoria e aprendizado</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Assistente de Saúde</h4>
              <p className="text-gray-400 text-sm">Para consultas médicas básicas</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default AssistentesPage
