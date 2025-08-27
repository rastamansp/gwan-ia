import React from 'react';

/**
 * Exemplos de uso das cores semânticas
 * Este arquivo demonstra como usar as cores com nomes descritivos
 */
export const ColorExamples: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-background min-h-screen">
      <h1 className="text-4xl font-bold text-gray-black">Sistema de Cores Semânticas</h1>
      
      {/* Cores de Destaque (Accent) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-black">Cores de Destaque (Accent)</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-accent-background border border-accent-border">
            <h3 className="font-semibold text-accent-strongText">Background</h3>
            <p className="text-sm text-accent-secondaryText">colors.accent.background</p>
          </div>
          
          <div className="p-4 rounded-lg bg-accent-surface border border-accent-border">
            <h3 className="font-semibold text-accent-strongText">Surface</h3>
            <p className="text-sm text-accent-secondaryText">colors.accent.surface</p>
          </div>
          
          <div className="p-4 rounded-lg bg-accent-muted border border-accent-border">
            <h3 className="font-semibold text-accent-strongText">Muted</h3>
            <p className="text-sm text-accent-secondaryText">colors.accent.muted</p>
          </div>
          
          <div className="p-4 rounded-lg bg-accent-primary text-white">
            <h3 className="font-semibold">Primary</h3>
            <p className="text-sm opacity-90">colors.accent.primary</p>
          </div>
        </div>
      </section>

      {/* Cores Neutras (Gray) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-black">Cores Neutras (Gray)</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-gray-background border border-gray-border">
            <h3 className="font-semibold text-gray-strongText">Background</h3>
            <p className="text-sm text-gray-secondaryText">colors.gray.background</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-surface border border-gray-border">
            <h3 className="font-semibold text-gray-strongText">Surface</h3>
            <p className="text-sm text-gray-secondaryText">colors.gray.surface</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-muted border border-gray-border">
            <h3 className="font-semibold text-gray-strongText">Muted</h3>
            <p className="text-sm text-gray-secondaryText">colors.gray.muted</p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-black text-white">
            <h3 className="font-semibold">Black</h3>
            <p className="text-sm opacity-90">colors.gray.black</p>
          </div>
        </div>
      </section>

      {/* Cores Semânticas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-black">Cores Semânticas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Success */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-success-primary">Sucesso</h3>
            <div className="space-y-2">
              <div className="p-3 rounded bg-success-background border border-success-border">
                <p className="text-sm text-success-text">Background</p>
              </div>
              <div className="p-3 rounded bg-success-primary text-white">
                <p className="text-sm">Primary</p>
              </div>
              <div className="p-3 rounded bg-success-muted border border-success-border">
                <p className="text-sm text-success-text">Muted</p>
              </div>
            </div>
          </div>
          
          {/* Warning */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-warning-primary">Aviso</h3>
            <div className="space-y-2">
              <div className="p-3 rounded bg-warning-background border border-warning-border">
                <p className="text-sm text-warning-text">Background</p>
              </div>
              <div className="p-3 rounded bg-warning-primary text-white">
                <p className="text-sm">Primary</p>
              </div>
              <div className="p-3 rounded bg-warning-muted border border-warning-border">
                <p className="text-sm text-warning-text">Muted</p>
              </div>
            </div>
          </div>
          
          {/* Error */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-error-primary">Erro</h3>
            <div className="space-y-2">
              <div className="p-3 rounded bg-error-background border border-error-border">
                <p className="text-sm text-error-text">Background</p>
              </div>
              <div className="p-3 rounded bg-error-primary text-white">
                <p className="text-sm">Primary</p>
              </div>
              <div className="p-3 rounded bg-error-muted border border-error-border">
                <p className="text-sm text-error-text">Muted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exemplos de Uso */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-black">Exemplos de Uso</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card de Exemplo */}
          <div className="p-6 rounded-lg bg-white border border-gray-border shadow-sm">
            <h3 className="text-lg font-semibold text-gray-black mb-2">Card de Exemplo</h3>
            <p className="text-gray-mutedText mb-4">
              Este card usa cores semânticas para background, borda e texto.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-accent-primary text-white rounded hover:bg-accent-primaryHover transition-colors">
                Ação Primária
              </button>
              <button className="px-4 py-2 bg-gray-surface text-gray-strongText border border-gray-border rounded hover:bg-gray-muted transition-colors">
                Ação Secundária
              </button>
            </div>
          </div>
          
          {/* Formulário de Exemplo */}
          <div className="p-6 rounded-lg bg-gray-surface border border-gray-border">
            <h3 className="text-lg font-semibold text-gray-black mb-2">Formulário</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-strongText mb-1">
                  Campo de Texto
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-border rounded focus:border-accent-border focus:ring-2 focus:ring-accent-primary"
                  placeholder="Digite aqui..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-strongText mb-1">
                  Campo com Erro
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-error-primary rounded focus:border-error-primaryHover focus:ring-2 focus:ring-error-primary"
                  placeholder="Campo com erro..."
                />
                <p className="text-sm text-error-text mt-1">Este campo tem um erro</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Código de Exemplo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-black">Código de Exemplo</h2>
        
        <div className="p-4 rounded-lg bg-gray-black text-gray-background font-mono text-sm">
          <pre>{`// Antes (com índices)
colors.accent[9]    // Cor primária
colors.gray[12]     // Texto escuro
colors.success[6]   // Verde de sucesso

// Agora (com nomes semânticos)
colors.accent.primary       // Cor primária
colors.gray.black           // Texto escuro
colors.success.primary      // Verde de sucesso

// Uso em componentes
<Button 
  variant="solid" 
  color="accent"
  className="bg-accent-primary hover:bg-accent-primaryHover"
>
  Clique aqui
</Button>

<Card className="bg-gray-surface border-gray-border text-gray-black">
  Conteúdo do card
</Card>`}</pre>
        </div>
      </section>
    </div>
  );
};
