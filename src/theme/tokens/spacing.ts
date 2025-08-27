// Sistema de espaçamento baseado no Radix UI Themes
// https://www.radix-ui.com/themes/playground

export const spacing = {
  // Escala base de espaçamento (8px grid system)
  0: '0px',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  18: '4.5rem',    // 72px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  88: '22rem',     // 352px
  96: '24rem',     // 384px
  128: '32rem',    // 512px
} as const;

// Espaçamento específico para componentes
export const componentSpacing = {
  // Padding
  padding: {
    xs: spacing[2],      // 8px
    sm: spacing[3],      // 12px
    md: spacing[4],      // 16px
    lg: spacing[6],      // 24px
    xl: spacing[8],      // 32px
    '2xl': spacing[12],  // 48px
  },

  // Margin
  margin: {
    xs: spacing[2],      // 8px
    sm: spacing[3],      // 12px
    md: spacing[4],      // 16px
    lg: spacing[6],      // 24px
    xl: spacing[8],      // 32px
    '2xl': spacing[12],  // 48px
  },

  // Gap entre elementos
  gap: {
    xs: spacing[1],      // 4px
    sm: spacing[2],      // 8px
    md: spacing[3],      // 12px
    lg: spacing[4],      // 16px
    xl: spacing[6],      // 24px
    '2xl': spacing[8],   // 32px
  },

  // Border radius
  radius: {
    none: '0px',
    sm: '0.125rem',      // 2px
    md: '0.25rem',       // 4px
    lg: '0.5rem',        // 8px
    xl: '0.75rem',       // 12px
    '2xl': '1rem',       // 16px
    '3xl': '1.5rem',     // 24px
    full: '9999px',
  },

  // Border width
  borderWidth: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },

  // Outline width
  outlineWidth: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
} as const;

// Espaçamento para layouts específicos
export const layoutSpacing = {
  // Container
  container: {
    padding: spacing[4],     // 16px
    maxWidth: '1200px',
    margin: '0 auto',
  },

  // Section
  section: {
    paddingY: spacing[16],   // 64px
    paddingX: spacing[4],    // 16px
  },

  // Card
  card: {
    padding: spacing[6],     // 24px
    gap: spacing[4],         // 16px
  },

  // Form
  form: {
    gap: spacing[4],         // 16px
    fieldGap: spacing[3],    // 12px
    groupGap: spacing[6],    // 24px
  },

  // Navigation
  navigation: {
    padding: spacing[4],     // 16px
    gap: spacing[6],         // 24px
  },

  // Button
  button: {
    paddingX: spacing[4],    // 16px
    paddingY: spacing[2],    // 8px
    gap: spacing[2],         // 8px
  },

  // Input
  input: {
    paddingX: spacing[3],    // 12px
    paddingY: spacing[2],    // 8px
  },

  // Modal
  modal: {
    padding: spacing[6],     // 24px
    gap: spacing[4],         // 16px
    maxWidth: '500px',
  },
} as const;

// Tipos para espaçamento
export type SpacingScale = keyof typeof spacing;
export type ComponentSpacing = keyof typeof componentSpacing.padding;
export type LayoutSpacing = keyof typeof layoutSpacing;

// Função para obter espaçamento
export const getSpacing = (size: SpacingScale): string => {
  return spacing[size];
};

// Função para obter espaçamento de componente
export const getComponentSpacing = (type: 'padding' | 'margin' | 'gap', size: ComponentSpacing): string => {
  return componentSpacing[type][size];
};

// Função para obter espaçamento de layout
export const getLayoutSpacing = (component: LayoutSpacing, property: string): string => {
  const layoutComponent = layoutSpacing[component] as Record<string, string>;
  return layoutComponent[property] || '0px';
};

// Função para criar classes de espaçamento responsivo
export const getResponsiveSpacing = (
  base: SpacingScale,
  sm?: SpacingScale,
  md?: SpacingScale,
  lg?: SpacingScale,
  xl?: SpacingScale
) => {
  return {
    base: spacing[base],
    sm: sm ? spacing[sm] : undefined,
    md: md ? spacing[md] : undefined,
    lg: lg ? spacing[lg] : undefined,
    xl: xl ? spacing[xl] : undefined,
  };
};
