import React from 'react';
import env from '../config/env';

const DebugPage: React.FC = () => {
  // Função para formatar o valor da variável
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '❌ Não definida';
    if (value === '') return '⚠️ Vazia';
    if (typeof value === 'string' && value.includes('localhost')) return `🔴 ${value} (DESENVOLVIMENTO)`;
    if (typeof value === 'string' && value.includes('gwan.com.br')) return `🟢 ${value} (PRODUÇÃO)`;
    return `✅ ${value}`;
  };

  // Função para verificar se é produção
  const isProduction = () => {
    return window.location.hostname === 'gwan.com.br' || 
           window.location.hostname === 'www.gwan.com.br';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔧 Debug - Variáveis de Ambiente
          </h1>
          <p className="text-lg text-gray-600">
            Validação das configurações do sistema
          </p>
          <div className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
            isProduction() 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            🌐 Ambiente: {isProduction() ? 'PRODUÇÃO' : 'DESENVOLVIMENTO'}
          </div>
        </div>

        {/* Variáveis de Ambiente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Configurações da Aplicação */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              📱 Aplicação
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Nome:</span>
                <span className="text-sm">{formatValue(env.APP_NAME)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Versão:</span>
                <span className="text-sm">{formatValue(env.APP_VERSION)}</span>
              </div>
            </div>
          </div>

          {/* API */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              🔌 API
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">URL Base:</span>
                <span className="text-sm break-all">{formatValue(env.API_URL)}</span>
              </div>
            </div>
          </div>

          {/* SMTP */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              📧 SMTP (Email)
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Host:</span>
                <span className="text-sm">{formatValue(env.SMTP_HOST)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Porta:</span>
                <span className="text-sm">{formatValue(env.SMTP_PORT)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Seguro:</span>
                <span className="text-sm">{formatValue(env.SMTP_SECURE)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Usuário:</span>
                <span className="text-sm">{formatValue(env.SMTP_USER)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Senha:</span>
                <span className="text-sm">{env.SMTP_PASSWORD ? '✅ Configurada' : '❌ Não configurada'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Nome Remetente:</span>
                <span className="text-sm">{formatValue(env.SMTP_FROM_NAME)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Email Remetente:</span>
                <span className="text-sm">{formatValue(env.SMTP_FROM_EMAIL)}</span>
              </div>
            </div>
          </div>

          {/* Admin */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              👑 Administrador
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-sm">{formatValue(env.ADMIN_EMAIL)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Senha:</span>
                <span className="text-sm">{env.ADMIN_PASSWORD ? '✅ Configurada' : '❌ Não configurada'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Nome:</span>
                <span className="text-sm">{formatValue(env.ADMIN_NAME)}</span>
              </div>
            </div>
          </div>

          {/* Chatwoot */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              💬 Chatwoot
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Chave:</span>
                <span className="text-sm">{env.CHATWOOT_KEY ? '✅ Configurada' : '❌ Não configurada'}</span>
              </div>
            </div>
          </div>

          {/* Informações do Sistema */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              🖥️ Sistema
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Hostname:</span>
                <span className="text-sm">{window.location.hostname}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Protocolo:</span>
                <span className="text-sm">{window.location.protocol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Porta:</span>
                <span className="text-sm">{window.location.port || '80/443'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">User Agent:</span>
                <span className="text-sm text-xs break-all">{navigator.userAgent.substring(0, 50)}...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              🧪 Como Testar
            </h3>
            <p className="text-blue-700 mb-4">
              Use esta página para validar se as variáveis de ambiente estão sendo carregadas corretamente.
            </p>
            <div className="text-sm text-blue-600 space-y-1">
              <p>✅ <strong>Verde:</strong> Configuração de produção detectada</p>
              <p>🔴 <strong>Vermelho:</strong> Configuração de desenvolvimento detectada</p>
              <p>⚠️ <strong>Amarelo:</strong> Valor vazio ou não configurado</p>
              <p>❌ <strong>Vermelho:</strong> Variável não definida</p>
            </div>
          </div>
        </div>

        {/* Botão Voltar */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
