import ChatbotCard from './ChatbotCard';

const Chatbots = () => {
  const chatbots = [
    {
      name: 'Jaiminho',
      description:
        'Seu médico naturopata, fornecendo informações sobre causas, sintomas e tratamentos naturais para doenças do século XXI.',
      accent: 'bg-gradient-to-br from-blue-500 to-blue-600',
      link: '/bot-jaiminho',
    },
    // Temporariamente desabilitado - chatbot indisponível
    // {
    //   name: 'Marley',
    //   description:
    //     'Obtenha informações sobre a carreira do Junior Dread, shows, turnês, rider técnico, próximas datas, informações para contratação e oportunidades de parceria.',
    //   accent: 'bg-gradient-to-br from-primary to-primary/70',
    //   link: '/bot-marley',
    // },
    // Temporariamente desabilitado - chatbot indisponível
    // {
    //   name: 'Gwan',
    //   description:
    //     'Nosso chatbot institucional, fornecendo informações sobre a empresa, detalhes de contato, parcerias e serviços de desenvolvimento de Chatbot de IA e inovação tecnológica.',
    //   accent: 'bg-gradient-primary',
    //   link: '/bot-gwan',
    // },
    {
      name: 'Gwan Mart',
      description:
        'Atendente virtual especializado em e-commerce. Tire dúvidas sobre produtos, pedidos, entrega e muito mais!',
      accent: 'bg-gradient-to-br from-blue-500 to-blue-600',
      link: '/bot-gwan-mart',
    },
    {
      name: 'Gwan Imóveis',
      description:
        'Assistente virtual especializado em imóveis. Busque propriedades, tire dúvidas sobre compra, venda e aluguel, agende visitas e muito mais!',
      accent: 'bg-gradient-to-br from-blue-500 to-blue-600',
      link: '/bot-gwan-imoveis',
    },
    {
      name: 'Gwan Events',
      description:
        'Assistente virtual especializado em eventos. Busque eventos, tire dúvidas sobre inscrições, agendas, programações e muito mais!',
      accent: 'bg-gradient-to-br from-blue-500 to-blue-600',
      link: '/bot-gwan-events',
    },
  ];

  return (
    <section className="py-24 px-4 bg-muted/30" id="chatbots">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Nossos{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Chatbots
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça nossos chatbots especializados e soluções de IA
            personalizadas
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl items-stretch">
            {chatbots.map((chatbot, index) => (
              <div key={index} className="w-full h-full">
                <ChatbotCard {...chatbot} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbots;
