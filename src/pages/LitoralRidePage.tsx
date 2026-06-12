import React from 'react';
import {
  CalendarClock,
  Car,
  ExternalLink,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PLATFORM_URL = 'https://ride.gwan.cloud';

const features = [
  {
    title: 'Caronas compartilhadas',
    description: 'Divida trajetos com quem vai para o mesmo destino.',
    icon: Car,
  },
  {
    title: 'Economia',
    description: 'Reduza custos dividindo o valor da corrida.',
    icon: Wallet,
  },
  {
    title: 'Foco no litoral de SP',
    description: 'Trajetos entre as cidades do litoral paulista.',
    icon: MapPin,
  },
  {
    title: 'Agendamento',
    description: 'Marque sua carona com antecedência e sem stress.',
    icon: CalendarClock,
  },
  {
    title: 'Segurança',
    description: 'Motoristas e passageiros verificados na plataforma.',
    icon: ShieldCheck,
  },
  {
    title: 'Mais sustentável',
    description: 'Menos carros na estrada significa menos emissões.',
    icon: Leaf,
  },
];

const LitoralRidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl space-y-8 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-600 backdrop-blur-sm dark:text-sky-400">
                <Sparkles className="h-4 w-4" />
                Corridas compartilhadas
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg shadow-sky-500/30">
                <Car className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                <span className="bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
                  Gwan Ride
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Caronas e corridas compartilhadas no litoral de SP. Divida o
                trajeto, economize e ajude a reduzir o trânsito.
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
                Por que usar o{' '}
                <span className="bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
                  Gwan Ride
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Mobilidade compartilhada feita para o litoral paulista
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <Card
                  key={title}
                  className="group h-full border-2 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/50 hover:shadow-hover"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 transition-transform duration-300 group-hover:scale-110">
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

export default LitoralRidePage;
