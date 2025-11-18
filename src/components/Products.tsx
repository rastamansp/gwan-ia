import ProductCard from './ProductCard';
import { ShoppingBag, Calendar, Home } from 'lucide-react';
// import { Scale } from 'lucide-react'; // Temporariamente desabilitado - produto Gwan Legal indisponível

const Products = () => {
  const products = [
    {
      title: 'Gwan Mart',
      description:
        'Nossa loja online completa com produtos premium, atendimento virtual especializado em e-commerce e suporte 24/7. Explore produtos tecnológicos com frete calculado, garantia completa e atendimento via WhatsApp.',
      features: [
        'Catálogo completo de produtos',
        'Atendente virtual com IA',
        'Rastreamento de pedidos',
        'Suporte 24/7',
      ],
      link: '/gwan-mart',
      icon: ShoppingBag,
      gradient: 'from-primary to-primary/70',
    },
    {
      title: 'Gwan Events',
      description:
        'Plataforma completa de gestão e participação em eventos. Acesse informações detalhadas sobre eventos, realize inscrições online, consulte agendas e programações, obtenha certificados e muito mais.',
      features: [
        'Informações sobre eventos',
        'Sistema de inscrições online',
        'Agenda e programação',
        'Certificados e materiais',
      ],
      link: '/gwan-events',
      icon: Calendar,
      gradient: 'from-secondary to-secondary/70',
    },
    // Temporariamente desabilitado - produto indisponível
    // {
    //   title: 'Gwan Legal',
    //   description:
    //     'O futuro do Direito brasileiro começa aqui. Plataforma de automação jurídica inteligente que utiliza IA para gerar contratos, petições e documentos jurídicos com precisão e eficiência.',
    //   features: [
    //     'Geração de contratos com IA',
    //     'Criação de petições jurídicas',
    //     'Documentos jurídicos precisos',
    //     'Automação jurídica inteligente',
    //   ],
    //   link: '/gwan-legal',
    //   icon: Scale,
    //   gradient: 'from-primary via-secondary to-primary',
    // },
    {
      title: 'Gwan Imóveis',
      description:
        'Plataforma completa de imóveis para compra, venda e aluguel. Encontre o imóvel dos seus sonhos com busca avançada, filtros inteligentes, galeria de fotos e vídeos, agendamento de visitas online e processos seguros.',
      features: [
        'Busca avançada de imóveis',
        'Filtros por localização e preço',
        'Galeria de fotos e vídeos',
        'Agendamento de visitas online',
      ],
      link: '/gwan-imoveis',
      icon: Home,
      gradient: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <section className="py-24 px-4 bg-background" id="produtos">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Nossos{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Produtos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça nossas plataformas e soluções digitais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
