import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AppLayout from '../../components/layout/AppLayout';
import { useNavigate } from 'react-router-dom';

const ChatbotsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Chatbots 💬</h2>
          <p className="text-gray-400">
            Crie e gerencie chatbots inteligentes para diferentes propósitos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card para criar novo chatbot */}
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
              Novo Chatbot
            </h3>
            <p className="text-gray-400 text-sm">
              Configure um novo chatbot personalizado
            </p>
          </div>

          {/* Chatbot de Suporte */}
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Suporte ao Cliente
            </h3>
            <p className="text-gray-400 text-sm">
              Atendimento 24/7 para clientes
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-green-400 text-sm">Online</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Configurar
              </button>
            </div>
          </div>

          {/* Chatbot Gwan Mart */}
          <div
            className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-green-500 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/bot-gwan-mart')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Gwan Mart</h3>
            <p className="text-gray-400 text-sm">
              Atendente virtual para e-commerce
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-green-400 text-sm">Online</span>
              <button
                className="text-blue-400 hover:text-blue-300 text-sm"
                onClick={e => {
                  e.stopPropagation();
                  navigate('/bot-gwan-mart');
                }}
              >
                Acessar
              </button>
            </div>
          </div>

          {/* Chatbot Bíblico */}
          <div
            className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-500 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate('/bot-biblia')}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Bíblia</h3>
            <p className="text-gray-400 text-sm">
              Geração de vídeos bíblicos com IA
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-green-400 text-sm">Online</span>
              <button
                className="text-blue-400 hover:text-blue-300 text-sm"
                onClick={e => {
                  e.stopPropagation();
                  navigate('/bot-biblia');
                }}
              >
                Acessar
              </button>
            </div>
          </div>

          {/* Chatbot de Vendas */}
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Vendas</h3>
            <p className="text-gray-400 text-sm">
              Assistente de vendas inteligente
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-yellow-400 text-sm">Em manutenção</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                Editar
              </button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Métricas</h3>
            <p className="text-gray-400 text-sm">Desempenho dos chatbots</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Conversas:</span>
                <span className="text-white">1,234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Taxa de resolução:</span>
                <span className="text-green-400">87%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatbotsPage;
