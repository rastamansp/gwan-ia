import { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'surface' | 'classic' | 'ghost';
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  /** Variante visual do card */
  variant?: CardVariant;
  
  /** Tamanho do card */
  size?: CardSize;
  
  /** Padding do card */
  padding?: CardPadding;
  
  /** Conteúdo do card */
  children: ReactNode;
  
  /** Classes CSS customizadas */
  className?: string;
}
