// Sistema de tipografia baseado no Radix UI Themes
// https://www.radix-ui.com/themes/playground

export const typography = {
  // Escala de tamanhos de fonte
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
  },

  // Escala de altura de linha
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Pesos de fonte
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Famílias de fonte
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },

  // Espaçamento entre letras
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Estilos de texto pré-definidos
  textStyles: {
    // Títulos
    h1: {
      fontSize: '2.25rem',
      lineHeight: '2.5rem',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },
    h4: {
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },
    h5: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },
    h6: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },

    // Texto do corpo
    body: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: '400',
    },
    bodyLarge: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontWeight: '400',
    },
    bodySmall: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: '400',
    },

    // Texto de interface
    ui: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: '500',
    },
    uiLarge: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: '500',
    },
    uiSmall: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      fontWeight: '500',
    },

    // Texto de código
    code: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      fontWeight: '400',
      fontFamily: 'mono',
    },
    codeLarge: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: '400',
      fontFamily: 'mono',
    },
  },
} as const;

// Tipos para tipografia
export type FontSize = keyof typeof typography.fontSize;
export type LineHeight = keyof typeof typography.lineHeight;
export type FontWeight = keyof typeof typography.fontWeight;
export type FontFamily = keyof typeof typography.fontFamily;
export type LetterSpacing = keyof typeof typography.letterSpacing;
export type TextStyle = keyof typeof typography.textStyles;

// Função para obter estilo de texto
export const getTextStyle = (style: TextStyle) => {
  return typography.textStyles[style];
};

// Função para obter classe CSS de tipografia
export const getTypographyClass = (
  size: FontSize = 'base',
  weight: FontWeight = 'normal',
  family: FontFamily = 'sans',
  lineHeight: LineHeight = 'normal',
  letterSpacing: LetterSpacing = 'normal'
) => {
  return {
    fontSize: typography.fontSize[size],
    fontWeight: typography.fontWeight[weight],
    fontFamily: typography.fontFamily[family].join(', '),
    lineHeight: typography.lineHeight[lineHeight],
    letterSpacing: typography.letterSpacing[letterSpacing],
  };
};
