import React from 'react';
import {
  ExternalLink,
  Clock,
  HeartHandshake,
  ShieldCheck,
  Wallet,
  Repeat,
  ScrollText,
  Sparkles,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import env from '../config/env';

const features = [
  {
    title: 'Banco de tempo',
    description:
      'Cada hora de voluntariado validada vira 1 crédito. Uma moeda baseada em tempo que circula na comunidade.',
    icon: Clock,
  },
  {
    title: 'Gestão de voluntariado',
    description:
      'Organizações publicam projetos e tarefas; voluntários se candidatam e registram presença.',
    icon: HeartHandshake,
  },
  {
    title: 'Validação dupla',
    description:
      'Nenhuma hora entra na economia sem confirmação do voluntário e do coordenador.',
    icon: ShieldCheck,
  },
  {
    title: 'Carteira de créditos',
    description:
      'Saldo em horas e extrato completo, com cada crédito rastreável até sua origem.',
    icon: Wallet,
  },
  {
    title: 'Economia de trocas',
    description:
      'Use seus créditos em serviços de outros membros e benefícios de parceiros locais.',
    icon: Repeat,
  },
  {
    title: 'Histórico auditável',
    description:
      'Ledger imutável (append-only): transparência total e base para a futura tokenização.',
    icon: ScrollText,
  },
];

const WorkPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl space-y-8 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600 backdrop-blur-sm dark:text-emerald-400">
                <Sparkles className="h-4 w-4" />
                Voluntariado com banco de tempo
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
                <HeartHandshake className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                  Gwan Work
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Doe horas, ganhe horas, fortaleça sua comunidade. Conecte
                voluntários a projetos sociais e transforme cada hora doada em
                crédito numa economia comunitária de tempo.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
                <Button size="lg" className="group text-lg" asChild>
                  <a
                    href={env.VITE_GWAN_WORK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar Gwan Work
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
                Como o{' '}
                <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                  banco de tempo
                </span>{' '}
                funciona
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Tecnologia a serviço da comunidade — confiança, impacto e
                reconhecimento para quem doa seu tempo
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <Card
                  key={title}
                  className="group h-full border-2 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-hover"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 transition-transform duration-300 group-hover:scale-110">
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

export default WorkPage;
