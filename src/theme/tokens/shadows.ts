// Sistema de sombras baseado no Radix UI Themes
// https://www.radix-ui.com/themes/playground

export const shadows = {
  // Sombras base
  none: 'none',
  
  // Sombras sutis
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  // Sombras coloridas (accent)
  accent: {
    xs: '0 1px 2px 0 rgb(59 130 246 / 0.05)',
    sm: '0 1px 3px 0 rgb(59 130 246 / 0.1), 0 1px 2px -1px rgb(59 130 246 / 0.1)',
    md: '0 4px 6px -1px rgb(59 130 246 / 0.1), 0 2px 4px -2px rgb(59 130 246 / 0.1)',
    lg: '0 10px 15px -3px rgb(59 130 246 / 0.1), 0 4px 6px -4px rgb(59 130 246 / 0.1)',
    xl: '0 20px 25px -5px rgb(59 130 246 / 0.1), 0 8px 10px -6px rgb(59 130 246 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(59 130 246 / 0.25)',
  },
  
  // Sombras de erro
  error: {
    xs: '0 1px 2px 0 rgb(239 68 68 / 0.05)',
    sm: '0 1px 3px 0 rgb(239 68 68 / 0.1), 0 1px 2px -1px rgb(239 68 68 / 0.1)',
    md: '0 4px 6px -1px rgb(239 68 68 / 0.1), 0 2px 4px -2px rgb(239 68 68 / 0.1)',
    lg: '0 10px 15px -3px rgb(239 68 68 / 0.1), 0 4px 6px -4px rgb(239 68 68 / 0.1)',
    xl: '0 20px 25px -5px rgb(239 68 68 / 0.1), 0 8px 10px -6px rgb(239 68 68 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(239 68 68 / 0.25)',
  },
  
  // Sombras de sucesso
  success: {
    xs: '0 1px 2px 0 rgb(34 197 94 / 0.05)',
    sm: '0 1px 3px 0 rgb(34 197 94 / 0.1), 0 1px 2px -1px rgb(34 197 94 / 0.1)',
    md: '0 4px 6px -1px rgb(34 197 94 / 0.1), 0 2px 4px -2px rgb(34 197 94 / 0.1)',
    lg: '0 10px 15px -3px rgb(34 197 94 / 0.1), 0 4px 6px -4px rgb(34 197 94 / 0.1)',
    xl: '0 20px 25px -5px rgb(34 197 94 / 0.1), 0 8px 10px -6px rgb(34 197 94 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(34 197 94 / 0.25)',
  },
  
  // Sombras de warning
  warning: {
    xs: '0 1px 2px 0 rgb(245 158 11 / 0.05)',
    sm: '0 1px 3px 0 rgb(245 158 11 / 0.1), 0 1px 2px -1px rgb(245 158 11 / 0.1)',
    md: '0 4px 6px -1px rgb(245 158 11 / 0.1), 0 2px 4px -2px rgb(245 158 11 / 0.1)',
    lg: '0 10px 15px -3px rgb(245 158 11 / 0.1), 0 4px 6px -4px rgb(245 158 11 / 0.1)',
    xl: '0 20px 25px -5px rgb(245 158 11 / 0.1), 0 8px 10px -6px rgb(245 158 11 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(245 158 11 / 0.25)',
  },
  
  // Sombras internas
  inner: {
    sm: 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    lg: 'inset 0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
  
  // Sombras de foco
  focus: {
    sm: '0 0 0 2px rgb(59 130 246 / 0.2)',
    md: '0 0 0 3px rgb(59 130 246 / 0.2)',
    lg: '0 0 0 4px rgb(59 130 246 / 0.2)',
  },
  
  // Sombras de ring (para inputs)
  ring: {
    sm: '0 0 0 1px rgb(59 130 246 / 0.2)',
    md: '0 0 0 2px rgb(59 130 246 / 0.2)',
    lg: '0 0 0 3px rgb(59 130 246 / 0.2)',
  },
} as const;

// Sombras específicas para componentes
export const componentShadows = {
  // Card
  card: {
    default: shadows.sm,
    hover: shadows.md,
    active: shadows.lg,
    elevated: shadows.xl,
  },
  
  // Button
  button: {
    default: shadows.none,
    hover: shadows.sm,
    active: shadows.inner.sm,
    disabled: shadows.none,
  },
  
  // Input
  input: {
    default: shadows.none,
    focus: shadows.focus.sm,
    error: shadows.error.xs,
  },
  
  // Modal
  modal: {
    backdrop: '0 0 0 100vw rgb(0 0 0 / 0.5)',
    content: shadows['2xl'],
  },
  
  // Dropdown
  dropdown: {
    default: shadows.lg,
    hover: shadows.xl,
  },
  
  // Tooltip
  tooltip: {
    default: shadows.md,
  },
  
  // Toast
  toast: {
    default: shadows.lg,
    success: shadows.success.md,
    error: shadows.error.md,
    warning: shadows.warning.md,
  },
} as const;

// Tipos para sombras
export type ShadowScale = keyof typeof shadows;
export type ComponentShadow = keyof typeof componentShadows;
export type ShadowColor = 'accent' | 'error' | 'success' | 'warning';

// Função para obter sombra
export const getShadow = (size: ShadowScale): string => {
  const shadow = shadows[size];
  if (typeof shadow === 'string') {
    return shadow;
  }
  return shadows.none;
};

// Função para obter sombra de componente
export const getComponentShadow = (component: ComponentShadow, state: string): string => {
  const componentShadow = componentShadows[component];
  if (typeof componentShadow === 'object' && componentShadow !== null) {
    const shadowObj = componentShadow as Record<string, string>;
    return shadowObj[state] || shadowObj.default || shadows.none;
  }
  return shadows.none;
};

// Função para obter sombra colorida
export const getColorShadow = (color: ShadowColor, size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'): string => {
  return shadows[color][size];
};

// Função para criar sombra customizada
export const createCustomShadow = (
  x: number = 0,
  y: number = 0,
  blur: number = 0,
  spread: number = 0,
  color: string = 'rgb(0 0 0 / 0.1)'
): string => {
  return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
};

// Função para criar sombra com opacidade
export const createShadowWithOpacity = (
  shadow: string,
  opacity: number
): string => {
  return shadow.replace(/rgb\([^)]+\)/, `rgb(0 0 0 / ${opacity})`);
};
