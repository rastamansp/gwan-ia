import React from 'react';
import { Button } from './button';
import { Input } from './input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';

/**
 * Exemplo de uso dos componentes do tema
 * Este arquivo demonstra como usar os componentes base do design system
 */
export const ThemeExample: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-background min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        Exemplos de Uso dos Componentes
      </h2>

      {/* Botões */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Botões</h3>

        {/* Variantes */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Variantes</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="solid" color="primary">
              Solid Primary
            </Button>
            <Button variant="soft" color="primary">
              Soft Primary
            </Button>
            <Button variant="outline" color="primary">
              Outline Primary
            </Button>
            <Button variant="ghost" color="primary">
              Ghost Primary
            </Button>
          </div>
        </div>

        {/* Cores */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Cores</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="solid" color="primary">
              Primary
            </Button>
            <Button variant="solid" color="success">
              Success
            </Button>
            <Button variant="solid" color="warning">
              Warning
            </Button>
            <Button variant="solid" color="danger">
              Danger
            </Button>
            <Button variant="solid" color="neutral">
              Neutral
            </Button>
          </div>
        </div>

        {/* Tamanhos */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Tamanhos</h4>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Estados */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Estados</h4>
          <div className="flex flex-wrap gap-3">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full Width</Button>
          </div>
        </div>

        {/* Com ícones */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Com Ícones</h4>
          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<span>←</span>}>Voltar</Button>
            <Button rightIcon={<span>→</span>}>Avançar</Button>
            <Button leftIcon={<span>📧</span>} rightIcon={<span>→</span>}>
              Enviar Email
            </Button>
          </div>
        </div>
      </section>

      {/* Exemplos de Inputs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-black">Inputs</h2>

        <div className="space-y-4 max-w-md">
          {/* Variantes de input */}
          <div className="space-y-2">
            <Input variant="classic" placeholder="Classic variant" />
            <Input variant="surface" placeholder="Surface variant" />
            <Input variant="soft" placeholder="Soft variant" />
            <Input variant="ghost" placeholder="Ghost variant" />
          </div>

          {/* Tamanhos de input */}
          <div className="space-y-2">
            <Input size="xs" placeholder="Extra Small" />
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
            <Input size="xl" placeholder="Extra Large" />
          </div>

          {/* Estados de input */}
          <div className="space-y-2">
            <Input disabled placeholder="Disabled input" />
            <Input error placeholder="Error input" />
            <Input
              leftIcon={<span>🔍</span>}
              placeholder="Input with left icon"
            />
            <Input
              rightIcon={<span>📧</span>}
              placeholder="Input with right icon"
            />
          </div>
        </div>
      </section>

      {/* Exemplos de Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-black">Cards</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Surface */}
          <Card variant="surface">
            <CardHeader>
              <CardTitle>Card Surface</CardTitle>
              <CardDescription>
                Este é um card com variante surface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-mutedText">
                Conteúdo do card com padding padrão e espaçamento adequado.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Ação</Button>
            </CardFooter>
          </Card>

          {/* Card Classic */}
          <Card variant="classic">
            <CardHeader>
              <CardTitle>Card Classic</CardTitle>
              <CardDescription>
                Este é um card com variante classic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-mutedText">
                Conteúdo do card com estilo classic e hover effects.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Cancelar
              </Button>
              <Button size="sm">Confirmar</Button>
            </CardFooter>
          </Card>

          {/* Card Ghost */}
          <Card variant="ghost">
            <CardHeader>
              <CardTitle>Card Ghost</CardTitle>
              <CardDescription>
                Este é um card com variante ghost
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-mutedText">
                Conteúdo do card com estilo ghost e transparência.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">
                Ver mais
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Exemplo de Formulário */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-black">
          Formulário de Exemplo
        </h2>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Entre com suas credenciais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-mutedText">
                Email
              </label>
              <Input
                type="email"
                placeholder="seu@email.com"
                leftIcon={<span>📧</span>}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-mutedText">
                Senha
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                leftIcon={<span>🔒</span>}
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Cancelar
            </Button>
            <Button className="flex-1">Entrar</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};
