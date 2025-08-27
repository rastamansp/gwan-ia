import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonColor = 'accent' | 'gray' | 'success' | 'warning' | 'error';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual do botão */
  variant?: ButtonVariant;
  
  /** Tamanho do botão */
  size?: ButtonSize;
  
  /** Cor do botão */
  color?: ButtonColor;
  
  /** Estado desabilitado */
  disabled?: boolean;
  
  /** Estado de carregamento */
  loading?: boolean;
  
  /** Largura total */
  fullWidth?: boolean;
  
  /** Conteúdo do botão */
  children: ReactNode;
  
  /** Classes CSS customizadas */
  className?: string;
  
  /** Função de clique */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Tipo do botão */
  type?: 'button' | 'submit' | 'reset';
}
