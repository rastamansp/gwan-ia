# Regras Clean Architecture - Projeto Gwan IA

## Princípios Fundamentais
- **Dependency Rule**: Dependências apontam apenas para dentro (camadas internas)
- **Separation of Concerns**: Cada camada tem responsabilidade única
- **SOLID Principles**: Aplicação rigorosa dos princípios SOLID
- **Testability**: Código deve ser facilmente testável

## Estrutura de Camadas

### 1. Presentation Layer (UI)
```
src/
├── components/          # Componentes React reutilizáveis
├── pages/              # Páginas/rotas da aplicação
├── hooks/              # Custom hooks para UI
└── styles/             # Estilos e temas
```

**Responsabilidades:**
- Renderização da interface
- Gerenciamento de estado local do componente
- Eventos de usuário
- NÃO deve conter lógica de negócio

### 2. Application Layer (Use Cases)
```
src/
├── features/           # Funcionalidades organizadas por domínio
│   ├── auth/
│   │   ├── use-cases/     # Casos de uso
│   │   ├── components/    # Componentes específicos
│   │   └── hooks/         # Hooks específicos
│   └── users/
│       ├── use-cases/
│       ├── components/
│       └── hooks/
```

**Responsabilidades:**
- Orquestração de casos de uso
- Validação de entrada
- Coordenação entre camadas
- NÃO deve conter regras de negócio complexas

### 3. Domain Layer (Business Rules)
```
src/
├── domain/
│   ├── entities/       # Entidades de negócio
│   ├── value-objects/  # Objetos de valor
│   ├── services/       # Serviços de domínio
│   └── repositories/   # Interfaces de repositório
```

**Responsabilidades:**
- Regras de negócio centrais
- Entidades e objetos de valor
- Lógica de validação de domínio
- NÃO deve depender de frameworks externos

### 4. Infrastructure Layer (Data & External)
```
src/
├── infrastructure/
│   ├── api/            # Clientes de API
│   ├── storage/        # Local storage, session storage
│   ├── config/         # Configurações
│   └── utils/          # Utilitários externos
```

**Responsabilidades:**
- Implementação de repositórios
- Comunicação com APIs externas
- Persistência de dados
- NÃO deve conter regras de negócio

## Padrões de Implementação

### Entidades de Domínio
```typescript
// src/domain/entities/user.ts
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export class User implements IUser {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly isActive: boolean
  ) {}

  // Métodos de domínio
  canAccessAdminPanel(): boolean {
    return this.role === UserRole.ADMIN && this.isActive;
  }
}
```

### Casos de Uso
```typescript
// src/features/auth/use-cases/login-user.ts
export interface ILoginUserUseCase {
  execute(credentials: LoginCredentials): Promise<LoginResult>;
}

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(credentials: LoginCredentials): Promise<LoginResult> {
    // Validação de entrada
    if (!this.validateCredentials(credentials)) {
      throw new ValidationError('Credenciais inválidas');
    }

    // Lógica de negócio
    const user = await this.authRepository.authenticate(credentials);
    if (!user.isActive) {
      throw new BusinessError('Usuário inativo');
    }

    return { user, token: user.generateToken() };
  }
}
```

### Repositórios
```typescript
// src/domain/repositories/user-repository.ts
export interface IUserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  save(user: IUser): Promise<void>;
  delete(id: string): Promise<void>;
}

// src/infrastructure/repositories/user-repository-impl.ts
export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly apiClient: IApiClient) {}

  async findById(id: string): Promise<IUser | null> {
    const response = await this.apiClient.get(`/users/${id}`);
    return response.data ? new User(...response.data) : null;
  }
}
```

## Princípios SOLID Aplicados

### Single Responsibility Principle
- Cada classe tem uma única responsabilidade
- Componentes React focam apenas na renderização
- Hooks gerenciam apenas um aspecto do estado

### Open/Closed Principle
- Extensível através de interfaces
- Fechado para modificação através de herança
- Uso de estratégias e decorators

### Liskov Substitution Principle
- Implementações de repositório são intercambiáveis
- Mocks podem substituir implementações reais
- Testes usam implementações fake

### Interface Segregation Principle
- Interfaces pequenas e específicas
- Componentes recebem apenas props necessárias
- Hooks expõem apenas funcionalidades essenciais

### Dependency Inversion Principle
- Dependências de abstrações, não implementações
- Injeção de dependência através de props
- Uso de context para dependências globais

## Organização de Features
```
src/features/auth/
├── components/
│   ├── login-form.tsx
│   └── user-menu.tsx
├── hooks/
│   ├── use-auth.ts
│   └── use-login.ts
├── use-cases/
│   ├── login-user.ts
│   └── logout-user.ts
├── types/
│   └── auth.types.ts
└── index.ts
```

## Regras de Importação
- Camadas externas podem importar de camadas internas
- Camadas internas NUNCA importam de camadas externas
- Use barrel exports (index.ts) para simplificar imports
- Evite imports circulares
