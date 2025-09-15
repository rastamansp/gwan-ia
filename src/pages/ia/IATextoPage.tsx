import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AppLayout from '../../components/layout/AppLayout';

const IATextoPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            IA para Texto 📝
          </h2>
          <p className="text-gray-400">
            Crie, edite e melhore textos com inteligência artificial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor de Texto */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Editor de Texto
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Conteúdo
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="article">Artigo</option>
                  <option value="email">Email</option>
                  <option value="story">História</option>
                  <option value="poem">Poema</option>
                  <option value="code">Código</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seu Texto
                </label>
                <textarea
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={6}
                  placeholder="Digite ou cole seu texto aqui..."
                />
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200">
                  ✨ Melhorar
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200">
                  📝 Reescrever
                </button>
              </div>
            </div>
          </div>

          {/* Histórico */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Histórico Recente
            </h3>

            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-400">Artigo</span>
                  <span className="text-xs text-gray-400">há 5 min</span>
                </div>
                <p className="text-white text-sm">
                  Texto sobre inteligência artificial...
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-400">Email</span>
                  <span className="text-xs text-gray-400">há 1 hora</span>
                </div>
                <p className="text-white text-sm">
                  Proposta comercial para cliente...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ferramentas */}
        <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Ferramentas de Texto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-3">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Correção</h4>
              <p className="text-gray-400 text-sm">Corrija erros gramaticais</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Resumo</h4>
              <p className="text-gray-400 text-sm">Crie resumos automáticos</p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
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
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v.01"
                  />
                </svg>
              </div>
              <h4 className="text-white font-medium mb-2">Tradução</h4>
              <p className="text-gray-400 text-sm">
                Traduza para outros idiomas
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
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
              <h4 className="text-white font-medium mb-2">Chat</h4>
              <p className="text-gray-400 text-sm">Converse sobre o texto</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IATextoPage;
