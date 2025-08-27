import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import HomePage from './pages/HomePage'
import ThemePage from './pages/ThemePage'
import AuthPage from './pages/AuthPage'
import RegisterPage from './pages/RegisterPage'
import VerifyLoginPage from './pages/VerifyLoginPage'
import VerifyAccountPage from './pages/VerifyAccountPage'
import DashboardPage from './pages/DashboardPage'
import MinhaIAPage from './pages/MinhaIAPage'
import ChatbotsPage from './pages/ChatbotsPage'
import TraducoesPage from './pages/TraducoesPage'
import IAImagensPage from './pages/IAImagensPage'
import IATextoPage from './pages/IATextoPage'
import IAVideoPage from './pages/IAVideoPage'
import IAAudioPage from './pages/IAAudioPage'
import AssistentesPage from './pages/AssistentesPage'
import PromptsPage from './pages/PromptsPage'
import BibliotecaPage from './pages/BibliotecaPage'
import BotJaiminhoPage from './pages/BotJaiminhoPage'
import BotMarleyPage from './pages/BotMarleyPage'
import BotGwanPage from './pages/BotGwanPage'
import DebugPage from './pages/DebugPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/register-account" element={<RegisterPage />} />
          <Route path="/auth/verify-login" element={<VerifyLoginPage />} />
          <Route path="/auth/verify-account" element={<VerifyAccountPage />} />
          
          {/* Rotas protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/minha-ia" element={
            <ProtectedRoute>
              <MinhaIAPage />
            </ProtectedRoute>
          } />
          <Route path="/chatbots" element={
            <ProtectedRoute>
              <ChatbotsPage />
            </ProtectedRoute>
          } />
          <Route path="/traducoes" element={
            <ProtectedRoute>
              <TraducoesPage />
            </ProtectedRoute>
          } />
          <Route path="/ia-imagens" element={
            <ProtectedRoute>
              <IAImagensPage />
            </ProtectedRoute>
          } />
          <Route path="/ia-texto" element={
            <ProtectedRoute>
              <IATextoPage />
            </ProtectedRoute>
          } />
          <Route path="/ia-video" element={
            <ProtectedRoute>
              <IAVideoPage />
            </ProtectedRoute>
          } />
          <Route path="/ia-audio" element={
            <ProtectedRoute>
              <IAAudioPage />
            </ProtectedRoute>
          } />
          <Route path="/assistentes" element={
            <ProtectedRoute>
              <AssistentesPage />
            </ProtectedRoute>
          } />
          <Route path="/prompts" element={
            <ProtectedRoute>
              <PromptsPage />
            </ProtectedRoute>
          } />
          <Route path="/biblioteca" element={
            <ProtectedRoute>
              <BibliotecaPage />
            </ProtectedRoute>
          } />
          
          {/* Rotas dos Chatbots */}
          <Route path="/bot-jaiminho" element={<BotJaiminhoPage />} />
          <Route path="/bot-marley" element={<BotMarleyPage />} />
          <Route path="/bot-gwan" element={<BotGwanPage />} />
          
          {/* Rota de Debug */}
          <Route path="/debug" element={<DebugPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
