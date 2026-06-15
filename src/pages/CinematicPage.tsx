import React from 'react';
import {
  ExternalLink,
  Clapperboard,
  Wand2,
  ShieldCheck,
  Workflow,
  Scissors,
  Captions,
  BadgeCheck,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import env from '../config/env';

const features = [
  {
    title: 'Linguagem natural → corte real',
    description:
      'Descreva o que quer numa frase ("edita num vídeo de lançamento de 30s") e o agente propõe a estratégia e executa.',
    icon: Wand2,
  },
  {
    title: 'Decisão humana no loop',
    description:
      'A IA propõe e espera o seu OK antes de cortar (Ask → confirm). Nada de edição surpresa.',
    icon: ShieldCheck,
  },
  {
    title: 'Pipeline transparente',
    description:
      'Transcribe → Pack → Reason → EDL → Render → Self-Eval, com os logs do agente streamados ao vivo.',
    icon: Workflow,
  },
  {
    title: 'Fillers e silêncios fora',
    description:
      'Cortes em fronteira de palavra e remoção automática de "umm", "uh" e pausas longas.',
    icon: Scissors,
  },
  {
    title: 'Legendas e color grade',
    description:
      'Legendas queimadas, fades de áudio e um grade básico para o vídeo já sair pronto para publicar.',
    icon: Captions,
  },
  {
    title: 'Qualidade auto-verificada',
    description:
      'A skill roda um self-eval sobre o resultado e corrige (até 3 passes) antes de entregar o final.mp4.',
    icon: BadgeCheck,
  },
];

const CinematicPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl space-y-8 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-600 backdrop-blur-sm dark:text-violet-400">
                <Clapperboard className="h-4 w-4" />
                Edição de vídeo com IA por linguagem natural
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
                <Clapperboard className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                  Cinematic
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Suba seu footage bruto, descreva em uma frase o que quer e
                receba de volta um vídeo editado — cortes em fronteira de
                palavra, remoção de fillers, color grade e legendas. Você aprova
                a estratégia antes de qualquer corte.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
                <Button size="lg" className="group text-lg" asChild>
                  <a
                    href={env.VITE_CINEMATIC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar Cinematic
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
                <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                  Cinematic
                </span>{' '}
                funciona
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Do footage bruto ao final.mp4 — um agente Claude que lê o vídeo
                pelo transcript e edita sob a sua aprovação
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <Card
                  key={title}
                  className="group h-full border-2 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50 hover:shadow-hover"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 transition-transform duration-300 group-hover:scale-110">
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

export default CinematicPage;
