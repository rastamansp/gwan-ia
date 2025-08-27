// Sistema de cores baseado no Radix UI Themes
// https://www.radix-ui.com/themes/playground

export const colors = {
  // Cores de destaque (Accent)
  accent: {
    background: 'hsl(210 40% 98%)',      // Background mais claro
    surface: 'hsl(210 40% 96%)',         // Background claro
    muted: 'hsl(214 32% 91%)',           // Background médio
    border: 'hsl(213 27% 84%)',          // Background médio-escuro
    secondary: 'hsl(215 20% 65%)',       // Background escuro
    secondaryText: 'hsl(215 16% 47%)',   // Texto médio
    text: 'hsl(215 19% 35%)',            // Texto escuro
    strongText: 'hsl(215 25% 27%)',      // Texto mais escuro
    primary: 'hsl(221 83% 53%)',         // Cor primária
    primaryHover: 'hsl(221 83% 47%)',    // Cor primária hover
    primaryLight: 'hsl(229 76% 66%)',    // Cor primária light
    primaryDark: 'hsl(229 84% 12%)',     // Cor primária dark
  },

  // Cores neutras (Gray)
  gray: {
    background: 'hsl(0 0% 99%)',         // Background mais claro
    surface: 'hsl(0 0% 97%)',            // Background claro
    muted: 'hsl(0 0% 95%)',              // Background médio
    border: 'hsl(0 0% 91%)',             // Background médio-escuro
    secondary: 'hsl(0 0% 84%)',          // Background escuro
    secondaryText: 'hsl(0 0% 65%)',      // Texto médio
    text: 'hsl(0 0% 47%)',               // Texto escuro
    strongText: 'hsl(0 0% 35%)',         // Texto mais escuro
    mutedText: 'hsl(0 0% 25%)',          // Texto muito escuro
    strongMutedText: 'hsl(0 0% 18%)',    // Texto extremamente escuro
    veryStrongText: 'hsl(0 0% 12%)',     // Texto quase preto
    black: 'hsl(0 0% 9%)',               // Preto
  },

  // Cores semânticas
  success: {
    background: 'hsl(142 76% 97%)',
    surface: 'hsl(142 76% 89%)',
    muted: 'hsl(142 76% 77%)',
    border: 'hsl(142 76% 65%)',
    secondary: 'hsl(142 76% 53%)',
    primary: 'hsl(142 76% 41%)',
    primaryHover: 'hsl(142 76% 29%)',
    strongText: 'hsl(142 76% 17%)',
    text: 'hsl(142 76% 11%)',
  },

  warning: {
    background: 'hsl(48 96% 97%)',
    surface: 'hsl(48 96% 89%)',
    muted: 'hsl(48 96% 77%)',
    border: 'hsl(48 96% 65%)',
    secondary: 'hsl(48 96% 53%)',
    primary: 'hsl(48 96% 41%)',
    primaryHover: 'hsl(48 96% 29%)',
    strongText: 'hsl(48 96% 17%)',
    text: 'hsl(48 96% 11%)',
  },

  error: {
    background: 'hsl(0 84% 97%)',
    surface: 'hsl(0 84% 89%)',
    muted: 'hsl(0 84% 77%)',
    border: 'hsl(0 84% 65%)',
    secondary: 'hsl(0 84% 53%)',
    primary: 'hsl(0 84% 41%)',
    primaryHover: 'hsl(0 84% 29%)',
    strongText: 'hsl(0 84% 17%)',
    text: 'hsl(0 84% 11%)',
  },

  // Cores de estado
  state: {
    active: 'hsl(221 83% 53%)',
    inactive: 'hsl(0 0% 65%)',
    disabled: 'hsl(0 0% 84%)',
    hover: 'hsl(221 83% 47%)',
    focus: 'hsl(221 83% 53%)',
    selected: 'hsl(221 83% 53%)',
  },
} as const;

// Tipos para as cores
export type ColorScale = keyof typeof colors;
export type AccentColor = keyof typeof colors.accent;
export type GrayColor = keyof typeof colors.gray;
export type SemanticColor = keyof typeof colors.success | keyof typeof colors.warning | keyof typeof colors.error;

// Função para obter cor com fallback
export const getColor = (color: string, fallback: string = colors.gray.secondaryText): string => {
  return color || fallback;
};

// Função para obter cor com opacidade
export const getColorWithOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('hsl(')) {
    return color.replace(')', ` / ${opacity})`);
  }
  return color;
};
