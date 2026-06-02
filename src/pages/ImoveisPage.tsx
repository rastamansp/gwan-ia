import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Building2,
  CalendarCheck,
  ExternalLink,
  FileCheck,
  Headphones,
  Images,
  MapPin,
  Sparkles,
  Star,
  Tags,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: 'Busca avançada',
    description:
      'Encontre imóveis por tipo, bairro e características em segundos.',
    icon: Building2,
  },
  {
    title: 'Filtros inteligentes',
    description:
      'Refine por localização, preço e diferenciais que importam pra você.',
    icon: MapPin,
  },
  {
    title: 'Galeria de fotos e vídeos',
    description: 'Conheça cada imóvel em detalhes antes mesmo da visita.',
    icon: Images,
  },
  {
    title: 'Agendamento de visitas',
    description: 'Marque visitas online, no horário que for melhor para você.',
    icon: CalendarCheck,
  },
  {
    title: 'Venda e aluguel',
    description: 'Anuncie ou encontre imóveis para comprar, vender ou alugar.',
    icon: Tags,
  },
  {
    title: 'Avaliações e recomendações',
    description: 'Decida com confiança a partir de avaliações reais.',
    icon: Star,
  },
  {
    title: 'Processos seguros',
    description: 'Documentação e transações com segurança do início ao fim.',
    icon: FileCheck,
  },
  {
    title: 'Suporte especializado',
    description: 'Atendimento dedicado para te acompanhar em cada etapa.',
    icon: Headphones,
  },
];

const ImoveisPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl space-y-8 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-600 backdrop-blur-sm dark:text-blue-400">
                <Sparkles className="h-4 w-4" />
                Plataforma de imóveis
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                <Building2 className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Gwan Imóveis
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Plataforma completa de imóveis. Encontre o imóvel dos seus
                sonhos, venda ou alugue com facilidade e segurança.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
                <Button size="lg" className="group text-lg" asChild>
                  <a
                    href="https://imoveis.gwan.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar Plataforma
                    <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <Link to="/bot-gwan-imoveis">
                    <Bot className="mr-2 h-5 w-5" />
                    Falar com o Assistente
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-background px-4 py-24">
          <div className="container mx-auto">
            <div className="mb-16 space-y-4 text-center">
              <h2 className="text-4xl font-bold md:text-5xl">
                O que você encontra na{' '}
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  plataforma
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Tudo para comprar, vender ou alugar com tranquilidade
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ title, description, icon: Icon }) => (
                <Card
                  key={title}
                  className="group h-full border-2 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-hover"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ImoveisPage;
