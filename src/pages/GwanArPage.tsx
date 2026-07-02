import React from 'react';
import {
  ExternalLink,
  Glasses,
  Boxes,
  Wand2,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import env from '../config/env';

const features = [
  {
    title: 'AR Avatar Marketplace',
    description:
      'Cena 3D com avatares vendedor e comprador encenando uma venda — demo guiada, card de produto, botão de compra e modo VR.',
    icon: ShoppingBag,
  },
  {
    title: 'Visualizador AR de modelos',
    description:
      'Galeria de modelos .glb com visualização em AR no seu espaço real, via Scene Viewer (Android) e Quick Look (iOS).',
    icon: Boxes,
  },
  {
    title: 'Image-to-3D com IA',
    description:
      'Envie a foto de um objeto e a IA (TRELLIS) reconstrói um modelo 3D que abre direto no visualizador AR.',
    icon: Wand2,
  },
  {
    title: 'Sem instalar app',
    description:
      'Tudo roda no navegador — desktop, celular e headset — através de um link, sem baixar nada.',
    icon: Smartphone,
  },
];

const GwanArPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl space-y-8 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 backdrop-blur-sm dark:text-cyan-400">
                <Sparkles className="h-4 w-4" />
                Playground de AR/WebXR — direto no navegador
              </div>

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
                <Glasses className="h-10 w-10 text-white" />
              </div>

              <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Gwan AR
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Demos de Realidade Aumentada e VR rodando direto no navegador,
                sem instalar app: compra encenada com avatares, visualizador de
                modelos 3D e geração de modelo 3D a partir de uma foto.
                Experimente no celular ou no PC.
              </p>

              <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
                <Button size="lg" className="group text-lg" asChild>
                  <a
                    href={env.VITE_GWAN_AR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver demos
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
                Experiências em{' '}
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Realidade Aumentada
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Um hub de demos independentes — escolha uma e já entre em AR ou
                VR
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ title, description, icon: Icon }) => (
                <Card
                  key={title}
                  className="group h-full border-2 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-hover"
                >
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 transition-transform duration-300 group-hover:scale-110">
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

export default GwanArPage;
