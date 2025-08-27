import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeVariant = 'default' | 'dark' | 'blue' | 'green' | 'purple' | 'orange';

export interface ITheme {
  id: ThemeVariant;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export const themes: Record<ThemeVariant, ITheme> = {
  default: {
    id: 'default',
    name: 'Padrão',
    description: 'Tema clássico com cores azuis',
    colors: {
      primary: 'hsl(221.2 83.2% 53.3%)',
      secondary: 'hsl(210 40% 96%)',
      accent: 'hsl(210 40% 96%)',
      background: 'hsl(0 0% 100%)',
    },
  },
  dark: {
    id: 'dark',
    name: 'Escuro',
    description: 'Tema escuro para uso noturno',
    colors: {
      primary: 'hsl(217.2 91.2% 59.8%)',
      secondary: 'hsl(217.2 32.6% 17.5%)',
      accent: 'hsl(217.2 32.6% 17.5%)',
      background: 'hsl(222.2 84% 4.9%)',
    },
  },
  blue: {
    id: 'blue',
    name: 'Azul',
    description: 'Tema com tons de azul',
    colors: {
      primary: 'hsl(217 91% 60%)',
      secondary: 'hsl(214 100% 96%)',
      accent: 'hsl(214 100% 96%)',
      background: 'hsl(214 100% 98%)',
    },
  },
  green: {
    id: 'green',
    name: 'Verde',
    description: 'Tema com tons de verde',
    colors: {
      primary: 'hsl(142 76% 41%)',
      secondary: 'hsl(142 100% 96%)',
      accent: 'hsl(142 100% 96%)',
      background: 'hsl(142 100% 98%)',
    },
  },
  purple: {
    id: 'purple',
    name: 'Roxo',
    description: 'Tema com tons de roxo',
    colors: {
      primary: 'hsl(262 83% 58%)',
      secondary: 'hsl(262 100% 96%)',
      accent: 'hsl(262 100% 96%)',
      background: 'hsl(262 100% 98%)',
    },
  },
  orange: {
    id: 'orange',
    name: 'Laranja',
    description: 'Tema com tons de laranja',
    colors: {
      primary: 'hsl(25 95% 53%)',
      secondary: 'hsl(25 100% 96%)',
      accent: 'hsl(25 100% 96%)',
      background: 'hsl(25 100% 98%)',
    },
  },
};

interface IThemeContext {
  currentTheme: ITheme;
  setTheme: (theme: ThemeVariant) => void;
  themes: Record<ThemeVariant, ITheme>;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>('default');

  const applyTheme = (theme: ITheme) => {
    const root = document.documentElement;
    
    // Remove todas as classes de tema anteriores
    root.classList.remove('dark', 'theme-blue', 'theme-green', 'theme-purple', 'theme-orange');
    
    // Adiciona a nova classe de tema
    if (theme.id === 'dark') {
      root.classList.add('dark');
    } else if (theme.id !== 'default') {
      root.classList.add(`theme-${theme.id}`);
    }
  };

  const setTheme = (themeId: ThemeVariant) => {
    const theme = themes[themeId];
    if (theme) {
      setCurrentTheme(themeId);
      applyTheme(theme);
      localStorage.setItem('selected-theme', themeId);
    }
  };

  useEffect(() => {
    // Carrega o tema salvo no localStorage ou usa o padrão
    const savedTheme = localStorage.getItem('selected-theme') as ThemeVariant;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      applyTheme(themes[savedTheme]);
    } else {
      applyTheme(themes.default);
    }
  }, []);

  const value: IThemeContext = {
    currentTheme: themes[currentTheme],
    setTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
