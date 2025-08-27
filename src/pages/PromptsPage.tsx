import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AppLayout from '../components/layout/AppLayout'

const PromptsPage: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Prompts 💡
          </h2>
          <p className="text-gray-400">
            Crie, gerencie e organize prompts de IA para diferentes tarefas e contextos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Criar Novo Prompt */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Criar Novo Prompt</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Título do Prompt</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ex: Especialista em Marketing Digital"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="writing">Escrita</option>
                  <option value="marketing">Marketing</option>
                  <option value="business">Negócios</option>
                  <option value="creative">Criativo</option>
                  <option value="technical">Técnico</option>
                  <option value="education">Educação</option>
                  <option value="health">Saúde</option>
                  <option value="custom">Personalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prompt</label>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={6}
                  placeholder="Digite o prompt completo aqui..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="marketing, digital, estratégia (separadas por vírgula)"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                💾 Salvar Prompt
              </button>
            </div>
          </div>

          {/* Prompts Existentes */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Seus Prompts</h3>
            
            <div className="space-y-3">
              {/* Prompt de Marketing */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Especialista em Marketing</h4>
                      <p className="text-gray-400 text-sm">Marketing e Negócios</p>
                    </div>
                  </div>
                  <span className="text-green-400 text-xs bg-green-900/20 px-2 py-1 rounded-full">Ativo</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full">marketing</span>
                  <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full">estratégia</span>
                  <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full">negócios</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Editar</button>
                  <button className="text-green-400 hover:text-green-300 text-sm">Copiar</button>
                  <button className="text-red-400 hover:text-red-300 text-sm">Excluir</button>
                </div>
              </div>

              {/* Prompt de Escrita */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Escritor Criativo</h4>
                      <p className="text-gray-400 text-sm">Escrita e Conteúdo</p>
                    </div>
                  </div>
                  <span className="text-green-400 text-xs bg-green-900/20 px-2 py-1 rounded-full">Ativo</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">escrita</span>
                  <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">criativo</span>
                  <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">conteúdo</span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">Editar</button>
                  <button className="text-green-400 hover:text-green-300 text-sm">Copiar</button>
                  <button className="text-red-400 hover:text-red-300 text-sm">Excluir</button>
                </div>
              </div>

              {/* Botão para criar mais */}
              <div className="bg-gray-700 rounded-lg p-4 text-center border-2 border-dashed border-gray-600 hover:border-purple-500 transition-colors duration-200 cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Criar Novo Prompt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prompts Populares */}
        <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Prompts Populares</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Analista de Dados</h4>
              <p className="text-gray-400 text-sm">Para análise e interpretação de dados</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.604l-.707.707a1 1 0 01-1.414 0L9.172 2.604M12 21.396l.707-.707a1 1 0 011.414 0l.707.707M2.604 12l.707.707a1 1 0 001.414 0L2.604 12m18.792 0l-.707-.707a1 1 0 00-1.414 0L21.396 12" />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Tutor Educacional</h4>
              <p className="text-gray-400 text-sm">Para ensino e aprendizado</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Consultor de Saúde</h4>
              <p className="text-gray-400 text-sm">Para orientações de saúde básicas</p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Estatísticas dos Prompts</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">2</div>
              <div className="text-gray-400 text-sm">Total de Prompts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">2</div>
              <div className="text-gray-400 text-sm">Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">23</div>
              <div className="text-gray-400 text-sm">Usos Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">8</div>
              <div className="text-gray-400 text-sm">Categorias</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default PromptsPage
