import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Imports organizados por categoria
import {
  HomePage,
  DashboardPage,
  AuthPage,
  RegisterPage,
  VerifyLoginPage,
  VerifyAccountPage,
  GwanMartPage,
  CatalogPage,
  ProductPage,
  MinhaIAPage,
  IAImagensPage,
  IATextoPage,
  IAVideoPage,
  IAAudioPage,
  ChatbotsPage,
  BotJaiminhoPage,
  BotMarleyPage,
  BotGwanPage,
  BotGwanMartPage,
  BotGwanImoveisPage,
  BotGwanEventsPage,
  BibleChatbotPage,
  DebugPage,
  ThemePage,
  MartAdminPage,
  EditProductPage,
  AssistentesPage,
  PromptsPage,
  BibliotecaPage,
  TraducoesPage,
  EventsPage,
  LegalPage,
  ImoveisPage,
} from './pages';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" />
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
