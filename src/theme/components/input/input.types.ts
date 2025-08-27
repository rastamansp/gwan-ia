import { InputHTMLAttributes, ReactNode } from 'react';

export type InputVariant = 'classic' | 'surface' | 'soft' | 'ghost';
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputColor = 'accent' | 'gray' | 'success' | 'warning' | 'error';

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Variante visual do input */
  variant?: InputVariant;
  
  /** Tamanho do input */
  size?: InputSize;
  
  /** Cor do input */
  color?: InputColor;
  
  /** Estado desabilitado */
  disabled?: boolean;
  
  /** Estado de erro */
  error?: boolean;
  
  /** Largura total */
  fullWidth?: boolean;
  
  /** Ícone à esquerda */
  leftIcon?: ReactNode;
  
  /** Ícone à direita */
  rightIcon?: ReactNode;
  
  /** Classes CSS customizadas */
  className?: string;
}
