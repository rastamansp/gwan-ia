import React from 'react';
import {
  ExternalLink,
  Megaphone,
  Type,
  ImageIcon,
  Layers,
  Store,
  PackageSearch,
  Sparkles,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import env from '../config/env';

const features = [
  {
    title: 'Texto de anúncio com IA',
    description:
      'Gere títulos, descrições e chamadas persuasivas a partir dos dados do produto, prontos para publicar.',
    icon: Type,
  },
  {
    title: 'Criativos de imagem',
    description:
      'Produza imagens e banners de campanha com IA, mantendo a identidade da sua marca.',
    icon: ImageIcon,
  },
  {
    title: 'Variações de campanha',
    description:
      'Crie múltiplas versões de um mesmo anúncio para testar abordagens e públicos diferentes.',
    icon: Layers,
  },
  {
    title: 'Catálogo integrado',
    description:
      'Cadastre seus produtos e gere anúncios direto do catálogo, sem retrabalho.',
    icon: PackageSearch,
  },
  {
    title: 'Exemplo Mercado Livre',
    description:
      'Comece com um fluxo pronto para o Mercado Livre e expanda para outros marketplaces.',
    icon: Store,
  },
  {
    title: 'Mais rápido ao ar',
    description:
      'Da ideia ao anúncio publicado em minutos — menos tempo em produção, mais tempo vendendo.',
    icon: Sparkles,
  },
];

const AdGenPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl space-y-8 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 text-sm font-medium text-fuchsia-600 backdrop-blur-sm dark:text-fuchsia-400">
                <Sparkles className="h-4 w-4" />
                Anúncios e criativos com IA para e-commerce
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500 to-pink-600 shadow-lg shadow-fuchsia-500/30">
                <Megaphone className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                <span className="bg-gradient-to-r from-fuchsia-500 to-pink-600 bg-clip-text text-transparent">
                  Gwan AdGen
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Transforme seus produtos em anúncios que vendem. Gere textos,
                imagens e variações de campanha com IA a partir do seu catálogo
                e publique mais rápido — começando pelo Mercado Livre.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
                <Button size="lg" className="group text-lg" asChild>
                  <a
                    href={env.VITE_GWAN_ADGEN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar Gwan AdGen
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
                <span className="bg-gradient-to-r from-fuchsia-500 to-pink-600 bg-clip-text text-transparent">
                  AdGen
                </span>{' '}
                funciona
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Do produto ao anúncio publicado em minutos — IA generativa a
                serviço das suas vendas no e-commerce
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <Card
                  key={title}
                  className="group h-full border-2 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-fuchsia-500/50 hover:shadow-hover"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 transition-transform duration-300 group-hover:scale-110">
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

export default AdGenPage;
