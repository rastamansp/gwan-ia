import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Bot, MessageCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '4', label: 'Chatbots especializados' },
  { value: '100%', label: 'Movido por IA' },
  { value: '24/7', label: 'Disponível sempre' },
  { value: 'WhatsApp', label: 'Atendimento integrado' },
];

const Hero = () => {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-gradient-hero pt-16">
      {/* Background decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute -right-20 bottom-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/40 blur-3xl animate-float"
        style={{ animationDelay: '4s' }}
      />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl space-y-8 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            Integração de Sistemas com IA
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Gwan
            </span>
            <br />
            <span className="text-foreground">Inovação que Transforma</span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Plataformas e soluções digitais impulsionadas por inteligência
            artificial para revolucionar o seu negócio.
          </p>

          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
            <Button
              size="lg"
              className="group text-lg shadow-glow-primary"
              asChild
            >
              <Link to="#produtos">
                Conheça Nossas Soluções
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <Link to="#chatbots">
                <Bot className="mr-2 h-5 w-5" />
                Explorar Chatbots
              </Link>
            </Button>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-primary" />
              Assistentes especializados
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-primary" />
              Respostas em tempo real
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              E-commerce integrado
            </span>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 border-t border-border/60 pt-8 md:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="bg-gradient-primary bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
