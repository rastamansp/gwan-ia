// Utilitários para o sistema de design

import { clsx, type ClassValue } from 'clsx';

/**
 * Combina classes CSS de forma inteligente
 * @param inputs - Classes CSS para combinar
 * @returns String com classes combinadas
 */
export const cn = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

/**
 * Cria classes responsivas para diferentes breakpoints
 * @param base - Classe base
 * @param sm - Classe para small (640px+)
 * @param md - Classe para medium (768px+)
 * @param lg - Classe para large (1024px+)
 * @param xl - Classe para xlarge (1280px+)
 * @returns Objeto com classes responsivas
 */
export const responsiveClasses = (
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) => {
  return {
    base,
    sm: sm ? `sm:${sm}` : undefined,
    md: md ? `md:${md}` : undefined,
    lg: lg ? `lg:${lg}` : undefined,
    xl: xl ? `xl:${xl}` : undefined,
  };
};

/**
 * Combina classes responsivas em uma string
 * @param responsiveObj - Objeto com classes responsivas
 * @returns String com todas as classes responsivas
 */
export const combineResponsiveClasses = (responsiveObj: ReturnType<typeof responsiveClasses>): string => {
  return Object.values(responsiveObj)
    .filter(Boolean)
    .join(' ');
};

/**
 * Cria variantes de componentes com classes condicionais
 * @param variants - Objeto com variantes
 * @param defaultVariant - Variante padrão
 * @returns Função para obter classes baseada na variante
 */
export const createVariantClasses = <T extends string>(
  variants: Record<T, string>,
  defaultVariant: T
) => {
  return (variant?: T) => {
    return variants[variant || defaultVariant] || variants[defaultVariant];
  };
};

/**
 * Cria classes de estado para componentes
 * @param states - Objeto com estados
 * @returns Função para obter classes baseada no estado
 */
export const createStateClasses = <T extends string>(
  states: Record<T, string>
) => {
  return (state: T) => {
    return states[state] || '';
  };
};

/**
 * Valida se uma cor é válida (hex, rgb, hsl)
 * @param color - Cor para validar
 * @returns True se a cor for válida
 */
export const isValidColor = (color: string): boolean => {
  const colorRegex = /^(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\))$/;
  return colorRegex.test(color);
};

/**
 * Converte cor para formato HSL
 * @param color - Cor para converter
 * @returns Cor em formato HSL
 */
export const toHSL = (color: string): string => {
  // Implementação básica - em produção usar uma biblioteca como colord
  if (color.startsWith('hsl(')) {
    return color;
  }
  
  // Para cores hex, rgb, etc. retornar como está por enquanto
  return color;
};

/**
 * Cria uma paleta de cores baseada em uma cor base
 * @param baseColor - Cor base
 * @param steps - Número de passos na paleta
 * @returns Array com cores da paleta
 */
export const createColorPalette = (_baseColor: string, steps: number = 9): string[] => {
  // Implementação básica - em produção usar uma biblioteca como colord
  const colors: string[] = [];
  
  for (let i = 0; i < steps; i++) {
    const lightness = Math.max(0, Math.min(100, 100 - (i * 10)));
    colors.push(`hsl(0, 0%, ${lightness}%)`);
  }
  
  return colors;
};
