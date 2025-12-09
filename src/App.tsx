import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Imports críticos (carregados imediatamente)
import { HomePage, AuthPage, RegisterPage, VerifyLoginPage, VerifyAccountPage } from './pages';

// Lazy loading para páginas menos críticas (code-splitting)
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const GwanMartPage = lazy(() => import('./pages/gwan-mart/GwanMartPage'));
const CatalogPage = lazy(() => import('./pages/gwan-mart/CatalogPage'));
const ProductPage = lazy(() => import('./pages/gwan-mart/ProductPage'));
const MinhaIAPage = lazy(() => import('./pages/ia/MinhaIAPage'));
const IAImagensPage = lazy(() => import('./pages/ia/IAImagensPage'));
const IATextoPage = lazy(() => import('./pages/ia/IATextoPage'));
const IAVideoPage = lazy(() => import('./pages/ia/IAVideoPage'));
const IAAudioPage = lazy(() => import('./pages/ia/IAAudioPage'));
const ChatbotsPage = lazy(() => import('./pages/bots/ChatbotsPage'));
const BotJaiminhoPage = lazy(() => import('./pages/bots/BotJaiminhoPage'));
const BotMarleyPage = lazy(() => import('./pages/bots/BotMarleyPage'));
const BotGwanPage = lazy(() => import('./pages/bots/BotGwanPage'));
const BotGwanMartPage = lazy(() => import('./pages/bots/BotGwanMartPage'));
const BotGwanImoveisPage = lazy(() => import('./pages/bots/BotGwanImoveisPage'));
const BotGwanEventsPage = lazy(() => import('./pages/bots/BotGwanEventsPage'));
const BibleChatbotPage = lazy(() => import('./pages/bots/BibleChatbotPage'));
const DebugPage = lazy(() => import('./pages/admin/DebugPage'));
const ThemePage = lazy(() => import('./pages/admin/ThemePage'));
const MartAdminPage = lazy(() => import('./pages/admin/MartAdminPage'));
const EditProductPage = lazy(() => import('./pages/admin/EditProductPage'));
const AssistentesPage = lazy(() => import('./pages/AssistentesPage'));
const PromptsPage = lazy(() => import('./pages/PromptsPage'));
const BibliotecaPage = lazy(() => import('./pages/BibliotecaPage'));
const TraducoesPage = lazy(() => import('./pages/TraducoesPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ImoveisPage = lazy(() => import('./pages/ImoveisPage'));

// Componente de loading para Suspense
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" />
        <Suspense fallback={<PageLoader />}>
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gwan-events" element={<EventsPage />} />
          <Route path="/gwan-legal" element={<LegalPage />} />
          <Route path="/gwan-imoveis" element={<ImoveisPage />} />
          <Route path="/gwan-mart" element={<GwanMartPage />} />
          <Route path="/gwan-mart/catalog" element={<CatalogPage />} />
          <Route
            path="/gwan-mart/product/:productCode"
            element={<ProductPage />}
          />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/register-account" element={<RegisterPage />} />
          <Route path="/auth/verify-login" element={<VerifyLoginPage />} />
          <Route path="/auth/verify-account" element={<VerifyAccountPage />} />

          {/* Rotas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/minha-ia"
            element={
              <ProtectedRoute>
                <MinhaIAPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbots"
            element={
              <ProtectedRoute>
                <ChatbotsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/traducoes"
            element={
              <ProtectedRoute>
                <TraducoesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ia-imagens"
            element={
              <ProtectedRoute>
                <IAImagensPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ia-texto"
            element={
              <ProtectedRoute>
                <IATextoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ia-video"
            element={
              <ProtectedRoute>
                <IAVideoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ia-audio"
            element={
              <ProtectedRoute>
                <IAAudioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assistentes"
            element={
              <ProtectedRoute>
                <AssistentesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prompts"
            element={
              <ProtectedRoute>
                <PromptsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/biblioteca"
            element={
              <ProtectedRoute>
                <BibliotecaPage />
              </ProtectedRoute>
            }
          />

          {/* Rotas dos Chatbots */}
          <Route path="/bot-jaiminho" element={<BotJaiminhoPage />} />
          <Route path="/bot-marley" element={<BotMarleyPage />} />
          <Route path="/bot-gwan" element={<BotGwanPage />} />
          <Route path="/bot-gwan-mart" element={<BotGwanMartPage />} />
          <Route path="/bot-gwan-imoveis" element={<BotGwanImoveisPage />} />
          <Route path="/bot-gwan-events" element={<BotGwanEventsPage />} />
          <Route path="/bot-biblia" element={<BibleChatbotPage />} />

          {/* Rota de Debug */}
          <Route path="/debug" element={<DebugPage />} />

          {/* Rota de Administração do Mart */}
          <Route
            path="/admin/mart"
            element={
              <ProtectedRoute>
                <MartAdminPage />
              </ProtectedRoute>
            }
          />

          {/* Rota de Edição de Produto */}
          <Route
            path="/admin/mart/product/:code/edit"
            element={
              <ProtectedRoute>
                <EditProductPage />
              </ProtectedRoute>
            }
          />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
