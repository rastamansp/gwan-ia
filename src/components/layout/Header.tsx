import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronDown, Menu, Sparkles } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  backButtonText?: string;
}

const produtos = [
  { name: 'Gwan Mart', href: '/gwan-mart' },
  { name: 'Gwan Events', href: '/gwan-events' },
  // Temporariamente desabilitado - produto indisponível
  // { name: 'Gwan Legal', href: '/gwan-legal' },
  { name: 'Gwan Imóveis', href: '/gwan-imoveis' },
];

const chatbots = [
  { name: 'Jaiminho', href: '/bot-jaiminho' },
  // Temporariamente desabilitado - chatbot indisponível
  // { name: 'Marley', href: '/bot-marley' },
  // { name: 'Gwan', href: '/bot-gwan' },
  { name: 'Gwan Mart', href: '/bot-gwan-mart' },
  { name: 'Gwan Imóveis', href: '/bot-gwan-imoveis' },
  { name: 'Gwan Events', href: '/bot-gwan-events' },
];

const Header: React.FC<HeaderProps> = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-primary"
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <span>Gwan IA</span>
          </Link>

          {/* Navigation (desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              Home
            </Link>

            {/* Produtos Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors outline-none">
                Produtos
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover/95 backdrop-blur-xl border-border/50">
                {produtos.map(produto => (
                  <DropdownMenuItem key={produto.name} asChild>
                    <Link
                      to={produto.href}
                      className="cursor-pointer hover:bg-accent/50"
                    >
                      {produto.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Chatbots Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors outline-none">
                Chatbots
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover/95 backdrop-blur-xl border-border/50">
                {chatbots.map(chatbot => (
                  <DropdownMenuItem key={chatbot.name} asChild>
                    <Link
                      to={chatbot.href}
                      className="cursor-pointer hover:bg-accent/50"
                    >
                      {chatbot.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button asChild className="shadow-lg shadow-primary/20">
              <Link to="/auth">Entrar</Link>
            </Button>

            {/* Mobile menu trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-xs border-border/50 bg-background/95 backdrop-blur-xl"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-primary">
                    <Sparkles className="h-5 w-5" />
                    Gwan IA
                  </SheetTitle>
                </SheetHeader>

                <nav className="mt-8 flex flex-col gap-6">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </Link>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Produtos
                    </p>
                    <div className="flex flex-col gap-2">
                      {produtos.map(produto => (
                        <Link
                          key={produto.name}
                          to={produto.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-foreground/80 hover:text-primary transition-colors"
                        >
                          {produto.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Chatbots
                    </p>
                    <div className="flex flex-col gap-2">
                      {chatbots.map(chatbot => (
                        <Link
                          key={chatbot.name}
                          to={chatbot.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-foreground/80 hover:text-primary transition-colors"
                        >
                          {chatbot.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Button
                    asChild
                    className="mt-2 w-full shadow-lg shadow-primary/20"
                  >
                    <Link to="/auth" onClick={() => setMobileOpen(false)}>
                      Entrar
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
