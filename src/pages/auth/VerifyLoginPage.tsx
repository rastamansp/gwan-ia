import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthService from '../../services/auth.service';
import { AuthError } from '../../types/errors';

const VerifyLoginPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const authService = AuthService.getInstance();
  const { login } = useAuth();

  const email = location.state?.email;

  // Se não houver email, redireciona para login
  if (!email) {
    navigate('/auth');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Chama o serviço para verificar o código
      const session = await authService.verifyLogin(email, code);

      console.log('Login realizado com sucesso:', session);

      // Salva o usuário no contexto de autenticação
      login(session);

      // Redireciona para o dashboard após login bem-sucedido
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro na verificação:', error);

      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError('Código inválido. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.login(email);
      setError('Código reenviado com sucesso!');
    } catch (error) {
      setError('Erro ao reenviar código. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Logo e Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
          <svg
            className="w-8 h-8 text-white"
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent mb-2">
          AI Admin
        </h1>
        <p className="text-gray-400 text-lg">Verifique o código de acesso</p>
      </div>

      {/* Card de Verificação */}
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Verificar Código
            </h2>
            <p className="text-gray-400 mb-4">
              Digite o código enviado para seu email
            </p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          {/* Mensagens de erro */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-white mb-2"
              >
                Código de Verificação
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="Digite o código de 6 dígitos"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-center text-lg tracking-widest"
                  required
                  disabled={isLoading}
                  maxLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verificando...
                </div>
              ) : (
                'Verificar Código'
              )}
            </button>
          </form>

          {/* Botão para reenviar código */}
          <div className="mt-6 text-center">
            <button
              onClick={handleResendCode}
              disabled={isLoading}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reenviar código
            </button>
          </div>
        </div>

        {/* Link para Voltar */}
        <div className="text-center mt-6">
          <Link
            to="/auth"
            className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-200"
          >
            ← Voltar para login
          </Link>
        </div>
      </div>

      {/* Link para Voltar ao Início */}
      <div className="mt-8">
        <Link
          to="/"
          className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-200"
        >
          ← Voltar para o início
        </Link>
      </div>
    </div>
  );
};

export default VerifyLoginPage;
