import React from 'react';
import {
  BarChart3,
  Coins,
  ExternalLink,
  Gift,
  Sparkles,
  Store,
  Users,
  Wallet,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PLATFORM_URL = 'https://chut.gwan.cloud';

const features = [
  {
    title: 'Moeda social',
    description:
      'Uma moeda comunitária para fazer o valor circular localmente.',
    icon: Coins,
  },
  {
    title: 'Recompensas por impacto',
    description: 'Seja recompensado por ações que geram impacto positivo.',
    icon: Gift,
  },
  {
    title: 'Economia local',
    description: 'Use em comércios e serviços parceiros da sua região.',
    icon: Store,
  },
  {
    title: 'Carteira digital',
    description: 'Gerencie seu saldo CHUT direto pelo aplicativo.',
    icon: Wallet,
  },
  {
    title: 'Transparência',
    description: 'Acompanhe o impacto gerado pela comunidade.',
    icon: BarChart3,
  },
  {
    title: 'Comunidade',
    description: 'Participe de uma rede de troca e colaboração.',
    icon: Users,
  },
];

const ChutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl space-y-8 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-600 backdrop-blur-sm dark:text-amber-400">
                <Sparkles className="h-4 w-4" />
                Moeda social e impacto
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30">
                <Coins className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  CHUT
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                A moeda social que recompensa ações de impacto positivo. Ganhe,
                gaste e fortaleça a economia da sua comunidade.
              </p>

              <div className="flex justify-center pt-2">
                <Button size="lg" className="group text-lg" asChild>
                  <a
                    href={PLATFORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar Plataforma
                    <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
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
                O que o{' '}
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  CHUT
                </span>{' '}
                oferece
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Uma economia que circula valor e gera impacto local
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <Card
                  key={title}
                  className="group h-full border-2 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-hover"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 transition-transform duration-300 group-hover:scale-110">
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

export default ChutPage;
