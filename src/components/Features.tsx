import { Card, CardContent } from '@/components/ui/card';
import {
  BrainCircuit,
  Plug,
  ShieldCheck,
  Clock,
  LucideIcon,
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: 'IA Especializada',
    description:
      'Assistentes treinados por domínio — e-commerce, imóveis, eventos e saúde — que entendem o contexto do seu negócio.',
    icon: BrainCircuit,
  },
  {
    title: 'Integração Total',
    description:
      'Conecte chat, loja e WhatsApp numa única plataforma. Do primeiro contato ao checkout, sem fricção.',
    icon: Plug,
  },
  {
    title: 'Disponível 24/7',
    description:
      'Atendimento que nunca dorme. Respostas em tempo real a qualquer hora, em qualquer dispositivo.',
    icon: Clock,
  },
  {
    title: 'Seguro e Confiável',
    description:
      'Arquitetura sólida, dados protegidos e infraestrutura monitorada para você focar no que importa.',
    icon: ShieldCheck,
  },
];

const Features = () => {
  return (
    <section className="bg-background px-4 py-24" id="diferenciais">
      <div className="container mx-auto">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Por que escolher a{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Gwan
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Tecnologia de ponta com a simplicidade que o seu dia a dia precisa
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <Card
              key={title}
              className="group h-full border-2 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-hover"
            >
              <CardContent className="space-y-4 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
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
  );
};

export default Features;
