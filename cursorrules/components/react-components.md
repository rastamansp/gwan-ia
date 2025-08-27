# Regras Componentes React - Projeto Gwan IA

## Estrutura de Componentes

### Componente Base
```typescript
// src/components/ui/button/button.tsx
import React from 'react';
import { IButtonProps } from './button.types';
import styles from './button.module.css';

export const Button: React.FC<IButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  className,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Arquivo de Tipos
```typescript
// src/components/ui/button/button.types.ts
export interface IButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

### Arquivo de Estilos
```css
/* src/components/ui/button/button.module.css */
.button {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.primary {
  background-color: var(--color-primary);
  color: white;
}

.secondary {
  background-color: var(--color-secondary);
  color: var(--color-text);
}

/* ... outros estilos */
```

### Arquivo de Índice
```typescript
// src/components/ui/button/index.ts
export { Button } from './button';
export type { IButtonProps } from './button.types';
```

## Padrões de Componentes

### 1. Componentes de Apresentação (Presentational)
- Recebem dados via props
- Não gerenciam estado
- Focam apenas na renderização
- Fáceis de testar e reutilizar

```typescript
// src/components/ui/card/card.tsx
interface ICardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<ICardProps> = ({ title, children, className }) => (
  <div className={`card ${className || ''}`}>
    <h3 className="card-title">{title}</h3>
    <div className="card-content">{children}</div>
  </div>
);
```

### 2. Componentes de Container (Container)
- Gerenciam estado e lógica
- Conectam com APIs e serviços
- Passam dados para componentes de apresentação

```typescript
// src/features/users/components/user-list-container.tsx
export const UserListContainer: React.FC = () => {
  const { users, loading, error, fetchUsers } = useUsers();
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return <UserList users={users} />;
};
```

### 3. Componentes Compostos (Compound)
- Permitem composição flexível
- Usam React.Children e React.cloneElement

```typescript
// src/components/ui/form/form.tsx
interface IFormProps {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

export const Form: React.FC<IFormProps> & {
  Field: typeof FormField;
  Submit: typeof FormSubmit;
} = ({ onSubmit, children }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // lógica de submissão
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

Form.Field = FormField;
Form.Submit = FormSubmit;
```

## Hooks Customizados

### Hook de Estado
```typescript
// src/hooks/use-toggle.ts
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return { value, toggle, setTrue, setFalse };
};
```

### Hook de API
```typescript
// src/hooks/use-api.ts
export const useApi = <T>(url: string) => {
  const [state, setState] = useState<IApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch(url);
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error.message });
    }
  }, [url]);

  return { ...state, fetchData };
};
```

## Padrões de Renderização

### Renderização Condicional
```typescript
// Usar operador ternário para casos simples
{isLoading ? <LoadingSpinner /> : <UserList users={users} />}

// Usar renderização condicional para casos complexos
const renderContent = () => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!users.length) return <EmptyState />;
  return <UserList users={users} />;
};

return <div>{renderContent()}</div>;
```

### Renderização de Listas
```typescript
// Sempre usar key única e estável
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// Para listas dinâmicas, usar ID ou índice estável
{items.map((item, index) => (
  <ListItem key={`${item.id}-${index}`} item={item} />
))}
```

## Performance e Otimização

### React.memo
```typescript
// Usar para componentes que renderizam frequentemente
export const UserCard = React.memo<IUserCardProps>(({ user, onEdit }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <button onClick={() => onEdit(user.id)}>Editar</button>
  </div>
));
```

### useCallback e useMemo
```typescript
// useCallback para funções passadas como props
const handleUserUpdate = useCallback((userId: string, data: Partial<IUser>) => {
  updateUser(userId, data);
}, [updateUser]);

// useMemo para cálculos custosos
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
}, [users]);
```

## Organização de Arquivos

### Estrutura de Pasta para Componentes
```
src/components/
├── ui/                    # Componentes base reutilizáveis
│   ├── button/
│   │   ├── button.tsx
│   │   ├── button.types.ts
│   │   ├── button.module.css
│   │   └── index.ts
│   ├── input/
│   └── modal/
├── layout/                # Componentes de layout
│   ├── header/
│   ├── sidebar/
│   └── footer/
└── business/              # Componentes específicos do negócio
    ├── user-card/
    └── product-list/
```

### Nomenclatura
- **Arquivos**: kebab-case (ex: user-card.tsx)
- **Componentes**: PascalCase (ex: UserCard)
- **Interfaces**: PascalCase com prefixo I (ex: IUserCardProps)
- **Estilos**: kebab-case (ex: user-card.module.css)

## Testes

### Estrutura de Teste
```typescript
// src/components/ui/button/__tests__/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```
