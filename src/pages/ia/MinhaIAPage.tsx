import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AppLayout from '../../components/layout/AppLayout';

const MinhaIAPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Minha IA 🤖</h2>
          <p className="text-gray-400">
            Gerencie suas ferramentas de inteligência artificial personalizadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card para criar nova IA */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-500 transition-colors duration-200 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Criar Nova IA
            </h3>
            <p className="text-gray-400 text-sm">
              Configure uma nova ferramenta de IA personalizada
            </p>
          </div>

          {/* Card para IAs existentes */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              IA de Suporte
            </h3>
            <p className="text-gray-400 text-sm">
              Assistente para atendimento ao cliente
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-green-400 text-sm">Ativo</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Configurar
              </button>
            </div>
          </div>

          {/* Card para estatísticas */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Estatísticas
            </h3>
            <p className="text-gray-400 text-sm">
              Visualize o desempenho das suas IAs
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total de IAs:</span>
                <span className="text-white">3</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-400">Ativas:</span>
                <span className="text-green-400">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MinhaIAPage;
