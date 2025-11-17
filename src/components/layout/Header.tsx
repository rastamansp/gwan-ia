import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  backButtonText?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const produtos = [
    { name: 'Gwan Mart', href: '/gwan-mart' },
    { name: 'Gwan Events', href: '/gwan-events' },
    { name: 'Gwan Legal', href: '/gwan-legal' },
    { name: 'Gwan Imóveis', href: '/gwan-imoveis' },
  ];

  const chatbots = [
    { name: 'Jaiminho', href: '/bot-jaiminho' },
    { name: 'Marley', href: '/bot-marley' },
    { name: 'Gwan', href: '/bot-gwan' },
    { name: 'Gwan Mart', href: '/bot-gwan-mart' },
    { name: 'Gwan Imóveis', href: '/bot-gwan-imoveis' },
    { name: 'Bíblia', href: '/bot-biblia' },
  ];

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

          {/* Navigation */}
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

          {/* CTA Button */}
          <Button asChild className="shadow-lg shadow-primary/20">
            <Link to="/auth">Entrar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
