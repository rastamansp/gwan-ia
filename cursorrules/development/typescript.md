# Regras TypeScript - Projeto Gwan IA

## Configuração TypeScript
- **Strict Mode**: Habilitado por padrão
- **Target**: ES2020 ou superior
- **Module Resolution**: Node16 ou bundler
- **Allow JS**: false (apenas TypeScript)

## Convenções de Nomenclatura
- **Interfaces**: PascalCase com prefixo I (ex: IUserProps)
- **Types**: PascalCase (ex: UserStatus, ApiResponse)
- **Enums**: PascalCase (ex: UserRole, OrderStatus)
- **Generics**: PascalCase com T (ex: T, K, V para simples, UserData para complexos)

## Estrutura de Tipos
```typescript
// Props de componentes
interface IComponentProps {
  title: string;
  isVisible?: boolean;
  onAction: (id: string) => void;
}

// Estados de componentes
interface IComponentState {
  isLoading: boolean;
  data: IDataItem[];
  error: string | null;
}

// Dados da API
interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}
```

## Padrões de Componentes
```typescript
// Componente funcional com TypeScript
interface IButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({
  variant,
  size = 'medium',
  disabled = false,
  onClick,
  children
}) => {
  // implementação
};
```

## Hooks Customizados
```typescript
// Hook com tipos bem definidos
interface IUseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useApi = <T>(url: string): IUseApiState<T> => {
  // implementação
};
```

## Tratamento de Erros
```typescript
// Tipos de erro customizados
interface IApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Função com tratamento de erro tipado
const handleApiCall = async <T>(
  apiCall: () => Promise<T>
): Promise<{ data: T | null; error: IApiError | null }> => {
  try {
    const data = await apiCall();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as IApiError };
  }
};
```

## Imports e Exports
```typescript
// Imports organizados
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Imports internos
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { IUser } from '@/types/user';

// Exports
export type { IUser, IUserProps };
export { UserCard, UserList };
```

## Validação de Props
```typescript
// Validação com PropTypes ou runtime
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'moderator'])
});

type User = z.infer<typeof UserSchema>;
```
