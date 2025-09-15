import { Routes, Route } from 'react-router-dom';
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
  DebugPage,
  ThemePage,
  MartAdminPage,
  AssistentesPage,
  PromptsPage,
  BibliotecaPage,
  TraducoesPage,
} from './pages';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gwan-mart" element={<GwanMartPage />} />
          <Route path="/gwan-mart/catalog" element={<CatalogPage />} />
          <Route
            path="/gwan-mart/product/:productId"
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
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
