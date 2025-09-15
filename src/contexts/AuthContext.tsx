import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { UserSession } from '../types/auth.types';
import { SessionService } from '../services/session.service';

interface AuthContextType {
  user: UserSession | null;
  login: (userData: UserSession) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const sessionService = SessionService.getInstance();

  // Verifica se há usuário na sessão ao inicializar
  useEffect(() => {
    const sessionUser = sessionService.getSession();
    if (sessionUser) {
      setUser(sessionUser);
    }
    setIsLoading(false);
  }, [sessionService]);

  const login = (userData: UserSession) => {
    setUser(userData);
    sessionService.setSession(userData);
  };

  const logout = () => {
    setUser(null);
    sessionService.clearSession();
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
