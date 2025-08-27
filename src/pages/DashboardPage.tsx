import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import AppLayout from '../components/layout/AppLayout'

const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Bem-vindo, {user.name}! 👋
          </h2>
          <p className="text-gray-400">
            Você está logado no sistema AI Admin. Aqui você pode gerenciar suas ferramentas de IA.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Informações da Conta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
              <p className="text-white">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">ID do Usuário</label>
              <p className="text-white font-mono text-sm">{user.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ativo
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center transition-colors duration-200">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-medium">Nova IA</span>
            </button>
            
            <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-colors duration-200">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <span className="font-medium">Configurações</span>
            </button>
            
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors duration-200">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-medium">Relatórios</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default DashboardPage
