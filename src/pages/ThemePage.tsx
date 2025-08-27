import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const ThemePage: React.FC = () => {
  const { currentTheme, setTheme, themes } = useTheme()

  return (
    <div className="min-h-screen bg-gray-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-accent-primary rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-black">Gwan IA</h1>
              </Link>
            </div>
            
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-mutedText hover:text-accent-primary font-medium">🏠 Home</Link>
              <Link to="/theme" className="text-accent-primary font-medium">🎨 Tema</Link>
              <Link to="/auth" className="text-gray-mutedText hover:text-accent-primary font-medium">🔐 Auth</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-black mb-4">🎨 Sistema de Design</h2>
          <p className="text-xl text-gray-mutedText max-w-3xl mx-auto">
            Explore nosso sistema de design completo com cores semânticas, componentes reutilizáveis e tokens de design baseados no Radix UI Themes.
          </p>
        </div>

        {/* Seletor de Temas */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-black mb-8">🎨 Seletor de Temas</h3>
          
          <div className="bg-white rounded-xl border border-gray-border p-8">
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold text-gray-black mb-2">Tema Atual: {currentTheme.name}</h4>
              <p className="text-gray-mutedText">{currentTheme.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(themes).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    currentTheme.id === theme.id
                      ? 'border-accent-primary bg-accent-background'
                      : 'border-gray-border bg-gray-surface hover:border-gray-secondary'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                         style={{ backgroundColor: theme.colors.primary }}>
                      {theme.name.charAt(0)}
                    </div>
                    <h5 className="font-semibold text-gray-black mb-1">{theme.name}</h5>
                    <p className="text-sm text-gray-mutedText">{theme.description}</p>
                    
                    {/* Preview das cores */}
                    <div className="flex justify-center space-x-1 mt-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.secondary }}></div>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.background }}></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cores Semânticas */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-black mb-8">🌈 Cores Semânticas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Accent Colors */}
            <div className="bg-white rounded-xl border border-gray-border p-6">
              <h4 className="font-semibold text-gray-black mb-4">Accent (Primárias)</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-mutedText">primary</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-accent-primary rounded border border-gray-border"></div>
                    <code className="text-xs text-gray-strongText">accent-primary</code>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-mutedText">primaryHover</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-accent-primaryHover rounded border border-gray-border"></div>
                    <code className="text-xs text-gray-strongText">accent-primaryHover</code>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-mutedText">background</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-accent-background rounded border border-gray-border"></div>
                    <code className="text-xs text-gray-strongText">accent-background</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Gray Colors */}
            <div className="bg-white rounded-xl border border-gray-border p-6">
              <h4 className="font-semibold text-gray-black mb-4">Gray (Neutras)</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-mutedText">background</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-background rounded border border-gray-border"></div>
                    <code className="text-xs text-gray-strongText">gray-background</code>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-mutedText">black</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-black rounded border border-gray-border"></div>
                    <code className="text-xs text-gray-strongText">gray-black</code>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-mutedText">mutedText</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-mutedText rounded border border-gray-border"></div>
                    <code className="text-xs text-gray-strongText">gray-mutedText</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Semantic Colors */}
            <div className="bg-white rounded-xl border border-gray-border p-6">
              <h4 className="font-semibold text-gray-black mb-4">Semânticas</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-mutedText">success</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-success-primary rounded border border-gray-border"></div>
                    <code className="text-xs text-gray-strongText">success-primary</code>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-mutedText">error</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-error-primary rounded border border-gray-border"></div>
                    <code className="text-xs text-gray-strongText">error-primary</code>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-mutedText">warning</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-warning-primary rounded border border-gray-border"></div>
                    <code className="text-xs text-gray-strongText">warning-primary</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Componentes */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-black mb-8">🧩 Componentes Base</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Botões */}
            <div className="bg-white rounded-xl border border-gray-border p-6">
              <h4 className="font-semibold text-gray-black mb-4">Botões</h4>
              <div className="space-y-3">
                <button className="bg-accent-primary text-white px-4 py-2 rounded-lg hover:bg-accent-primaryHover focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 transition-colors">
                  Primary
                </button>
                <button className="bg-gray-surface text-gray-strongText px-4 py-2 rounded-lg hover:bg-gray-muted focus:ring-2 focus:ring-gray-mutedText focus:ring-offset-2 transition-colors">
                  Secondary
                </button>
                <button className="border border-gray-border text-gray-strongText px-4 py-2 rounded-lg hover:bg-gray-surface focus:ring-2 focus:ring-gray-mutedText focus:ring-offset-2 transition-colors">
                  Outline
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="bg-white rounded-xl border border-gray-border p-6">
              <h4 className="font-semibold text-gray-black mb-4">Inputs</h4>
              <div className="space-y-3">
                <input type="text" placeholder="Input padrão" className="w-full px-3 py-2 border border-gray-border rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-border transition-colors" />
                <input type="email" placeholder="Email com erro" className="w-full px-3 py-2 border border-error-primary rounded-lg focus:ring-2 focus:ring-error-primary focus:border-error-primaryHover bg-error-background transition-colors" />
              </div>
            </div>
          </div>
        </section>

        {/* Tipografia */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-black mb-8">🔤 Tipografia</h3>
          
          <div className="bg-white rounded-xl border border-gray-border p-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-black">Título H1 - Inter Bold</h1>
              <h2 className="text-3xl font-semibold text-gray-black">Título H2 - Inter Semibold</h2>
              <h3 className="text-2xl font-medium text-gray-black">Título H3 - Inter Medium</h3>
              <h4 className="text-xl font-medium text-gray-black">Título H4 - Inter Medium</h4>
              <p className="text-base text-gray-strongText">Texto do corpo - Inter Regular com cor strongText</p>
              <p className="text-sm text-gray-mutedText">Texto pequeno - Inter Regular com cor mutedText</p>
              <code className="text-sm font-mono text-gray-strongText bg-gray-muted px-2 py-1 rounded">Código inline - JetBrains Mono</code>
            </div>
          </div>
        </section>

        {/* Espaçamento */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-black mb-8">📏 Sistema de Espaçamento</h3>
          
          <div className="bg-white rounded-xl border border-gray-border p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-4 h-4 bg-accent-primary mx-auto mb-2"></div>
                <span className="text-sm text-gray-mutedText">4px</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-accent-primary mx-auto mb-2"></div>
                <span className="text-sm text-gray-mutedText">8px</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-primary mx-auto mb-2"></div>
                <span className="text-sm text-gray-mutedText">12px</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-primary mx-auto mb-2"></div>
                <span className="text-sm text-gray-mutedText">16px</span>
              </div>
            </div>
            <p className="text-sm text-gray-mutedText text-center mt-4">
              Baseado em grid de 8px para consistência
            </p>
          </div>
        </section>

        {/* Como Usar */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-black mb-8">💡 Como Usar</h3>
          
          <div className="bg-white rounded-xl border border-gray-border p-8">
            <h4 className="font-semibold text-gray-black mb-4">Classes do Tailwind CSS</h4>
            <div className="bg-gray-muted rounded-lg p-4 font-mono text-sm">
              <pre><code>{`// Cores de fundo
bg-accent-primary      // Azul primário
bg-gray-background     // Background neutro
bg-success-primary     // Verde de sucesso

// Cores de texto
text-gray-black        // Texto principal
text-gray-mutedText    // Texto secundário
text-accent-primary    // Texto azul

// Bordas
border-gray-border     // Borda padrão
border-accent-primary  // Borda azul
border-error-primary   // Borda de erro

// Estados de foco
focus:ring-accent-primary  // Anel de foco azul
focus:border-accent-border // Borda de foco azul`}</code></pre>
            </div>
          </div>
        </section>

        {/* Links Úteis */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-black mb-8">🔗 Links Úteis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-border p-6">
              <h4 className="font-semibold text-gray-black mb-4">📚 Documentação</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/src/theme/README.md" className="text-accent-primary hover:text-accent-primaryHover text-sm">
                    Sistema de Design - README
                  </a>
                </li>
                <li>
                  <a href="/src/theme/components/example-usage.tsx" className="text-accent-primary hover:text-accent-primaryHover text-sm">
                    Exemplos de Uso
                  </a>
                </li>
                <li>
                  <a href="/src/theme/color-examples.tsx" className="text-accent-primary hover:text-accent-primaryHover text-sm">
                    Exemplos de Cores
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-border p-6">
              <h4 className="font-semibold text-gray-black mb-4">🛠️ Ferramentas</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-primaryHover text-sm">
                    Tailwind CSS
                  </a>
                </li>
                <li>
                  <a href="https://www.radix-ui.com/themes/playground" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-primaryHover text-sm">
                    Radix UI Themes
                  </a>
                </li>
                <li>
                  <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:text-accent-primaryHover text-sm">
                    Fonte Inter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-600">
              🎨 <strong>Sistema de Design</strong> - Gwan IA
            </p>
            <p className="text-sm text-gray-mutedText mt-2">
              Baseado em Radix UI Themes e Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ThemePage
