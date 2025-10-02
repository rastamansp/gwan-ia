import React, { useState } from 'react';
import Header from '../../components/layout/Header';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  meta?: string;
  timestamp: Date;
}

const BibleChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: `Olá! 👋 Vou te ajudar a criar um vídeo curto baseado em uma história da Bíblia.
Usarei suas respostas apenas para montar o roteiro e o prompt do vídeo.
Você aceita prosseguir e os termos de uso?`,
      meta: 'Passo: Consentimento',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'user',
      content: 'Sim, aceito.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '3',
      type: 'bot',
      content: `Qual história você quer usar?
Sugestões: <span class="tag">Davi e Golias</span><span class="tag">Noé</span><span class="tag">Êxodo</span><span class="tag">Nascimento de Jesus</span><span class="tag">Ressurreição</span>`,
      meta: 'Passo: História',
      timestamp: new Date(),
    },
    {
      id: '4',
      type: 'user',
      content: 'Davi e Golias.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '5',
      type: 'bot',
      content: 'Quem é o público-alvo e qual o objetivo do vídeo?',
      meta: 'Passo: Público & Objetivo',
      timestamp: new Date(),
    },
    {
      id: '6',
      type: 'user',
      content: 'Jovens da igreja; objetivo: inspirar e ensinar.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '7',
      type: 'bot',
      content: `Escolha o tom/estilo:
<span class="tag">Épico</span><span class="tag">Didático</span><span class="tag">Cinematográfico</span><span class="tag">Suave</span>`,
      meta: 'Passo: Tom',
      timestamp: new Date(),
    },
    {
      id: '8',
      type: 'user',
      content: 'Cinematográfico e inspirador.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '9',
      type: 'bot',
      content: 'Descreva os personagens principais (traços, roupas):',
      meta: 'Passo: Personagens',
      timestamp: new Date(),
    },
    {
      id: '10',
      type: 'user',
      content: `Davi: jovem pastor, pele morena clara, túnica simples de linho, estilingue e bolsa de couro.
Golias: guerreiro alto, armadura de bronze e lança grande.`,
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '11',
      type: 'bot',
      content: 'Agora o ambiente/cenário:',
      meta: 'Passo: Ambiente',
      timestamp: new Date(),
    },
    {
      id: '12',
      type: 'user',
      content:
        'Vale de Elá, colinas ao fundo, exércitos de Israel e filisteus em lados opostos.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '13',
      type: 'bot',
      content: `Ângulos e movimentos de câmera?
Exemplos: <code class="inline">close</code>, <code class="inline">médio</code>, <code class="inline">aéreo</code>, 
<code class="inline">tracking</code>, <code class="inline">push in</code>.`,
      meta: 'Passo: Câmera',
      timestamp: new Date(),
    },
    {
      id: '14',
      type: 'user',
      content:
        'Aéreo inicial do vale, tracking em Davi caminhando, close no rosto e "push in" no momento do lançamento.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '15',
      type: 'bot',
      content: `Iluminação/estilo?
<span class="tag">Manhã</span><span class="tag">Pôr do sol</span><span class="tag">Natural</span><span class="tag">Cinematográfico</span>`,
      meta: 'Passo: Luz',
      timestamp: new Date(),
    },
    {
      id: '16',
      type: 'user',
      content: 'Pôr do sol com luz quente e contraste suave.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '17',
      type: 'bot',
      content: 'Ações/diálogos-chave (inclua emoções):',
      meta: 'Passo: Ação & Diálogo',
      timestamp: new Date(),
    },
    {
      id: '18',
      type: 'user',
      content: `Davi declara com confiança: "Eu vou em nome do Senhor dos Exércitos."
Golias ri com desdém. Davi gira o estilingue e acerta a testa do gigante.`,
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '19',
      type: 'bot',
      content: 'Quer adicionar <em>cut to scenes</em> para contexto?',
      meta: 'Passo: Cut to Scenes',
      timestamp: new Date(),
    },
    {
      id: '20',
      type: 'user',
      content:
        'Corte breve para o exército de Israel em suspense e depois vibrando com a queda de Golias.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '21',
      type: 'bot',
      content: 'Duração e formato do vídeo?',
      meta: 'Passo: Duração & Formato',
      timestamp: new Date(),
    },
    {
      id: '22',
      type: 'user',
      content: '45 segundos em 9:16 (vertical).',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '23',
      type: 'bot',
      content: 'Narração (voz/idioma/ritmo) e trilha?',
      meta: 'Passo: Voz & Música',
      timestamp: new Date(),
    },
    {
      id: '24',
      type: 'user',
      content:
        'Narração masculina em português, ritmo firme; música épica leve com percussão.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '25',
      type: 'bot',
      content: 'Elementos de marca/legendas/CTA?',
      meta: 'Passo: Marca & CTA',
      timestamp: new Date(),
    },
    {
      id: '26',
      type: 'user',
      content:
        'Logo "Jornada da Fé" no início e CTA final: "Conheça as Escrituras completas". Legendas automáticas.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '27',
      type: 'bot',
      content: `Ótimo! Montei o <strong>preview do prompt</strong> de vídeo com base nas suas respostas:
<div class="preview">
[CHARACTER DESCRIPTION] Davi (jovem pastor, túnica de linho, estilingue) e Golias (guerreiro alto com armadura de bronze).<br>
[CAMERA ANGLE/MOVEMENT] Aéreo do vale → tracking em Davi → close "push in" no lançamento.<br>
[ENVIRONMENT DETAILS] Vale de Elá, colinas, exércitos opostos observando.<br>
[LIGHTING/STYLE] Pôr do sol, cinematográfico, quente e inspirador.<br>
[ACTION/DIALOGUE] Davi confiante: "Eu vou em nome do Senhor dos Exércitos." Golias ri; pedra acerta a testa.<br>
[CUT TO SCENES] Reação dos israelitas: suspense → celebração.<br>
[DURAÇÃO/FORMATO] 45s, 9:16.<br>
[NARRAÇÃO] PT-BR masc., ritmo firme.<br>
[MÚSICA/SFX] Épica leve com percussão.<br>
[BRANDING/CTA] Logo "Jornada da Fé", CTA final: "Conheça as Escrituras completas".
</div>
Deseja <strong>aprovar</strong> ou <strong>editar</strong> alguma seção?`,
      meta: 'Passo: Revisão',
      timestamp: new Date(),
    },
    {
      id: '28',
      type: 'user',
      content: 'Aprovar.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '29',
      type: 'bot',
      content: 'Enviando o prompt ao motor de geração… ✅',
      meta: 'Passo: Geração',
      timestamp: new Date(),
    },
    {
      id: '30',
      type: 'bot',
      content:
        'Vídeo gerado! Aqui está um preview (simulado). Deseja baixar ou compartilhar?',
      meta: 'Resultado',
      timestamp: new Date(),
    },
    {
      id: '31',
      type: 'bot',
      content: `Gostaria de adquirir uma <strong>cópia das Escrituras</strong> para aprofundar-se nesta história?
Temos formato <em>Digital</em> (PDF/ePub) e <em>Físico</em>.`,
      meta: 'Oferta',
      timestamp: new Date(),
    },
    {
      id: '32',
      type: 'user',
      content: 'Quero o formato digital.',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '33',
      type: 'bot',
      content:
        'Perfeito! Informe um e-mail para receber o link de download e a licença de uso.',
      meta: 'Checkout',
      timestamp: new Date(),
    },
    {
      id: '34',
      type: 'user',
      content: 'meuemail@example.com',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '35',
      type: 'bot',
      content: `Pagamento concluído via PIX. ✅
Enviamos o link de download para <strong>meuemail@example.com</strong>.
Precisa de algo mais?`,
      meta: 'Confirmação & Encerramento',
      timestamp: new Date(),
    },
    {
      id: '36',
      type: 'user',
      content: 'Tudo certo. Obrigado!',
      meta: 'Usuário',
      timestamp: new Date(),
    },
    {
      id: '37',
      type: 'bot',
      content: `Obrigado você! 🙏
Se quiser, posso reutilizar suas preferências para o próximo vídeo.`,
      meta: 'Fim',
      timestamp: new Date(),
    },
  ]);

  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      meta: 'Usuário',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsTyping(true);

    // Simular resposta do bot
    setTimeout(() => {
      const botResponse = generateBotResponse(content.trim());
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        meta: botResponse.meta,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (
    userInput: string
  ): { content: string; meta: string } => {
    const input = userInput.toLowerCase();

    if (input.includes('sim') || input.includes('aceito')) {
      return {
        content: `Qual história você quer usar?
Sugestões: ${[
          'Davi e Golias',
          'Noé',
          'Êxodo',
          'Nascimento de Jesus',
          'Ressurreição',
        ]
          .map(tag => `<span class="tag">${tag}</span>`)
          .join('')}`,
        meta: 'Passo: História',
      };
    }

    if (input.includes('davi') || input.includes('golias')) {
      return {
        content: 'Quem é o público-alvo e qual o objetivo do vídeo?',
        meta: 'Passo: Público & Objetivo',
      };
    }

    if (
      input.includes('jovens') ||
      input.includes('inspirar') ||
      input.includes('ensinar')
    ) {
      return {
        content: `Escolha o tom/estilo:
${['Épico', 'Didático', 'Cinematográfico', 'Suave']
  .map(tag => `<span class="tag">${tag}</span>`)
  .join('')}`,
        meta: 'Passo: Tom',
      };
    }

    if (input.includes('cinematográfico') || input.includes('inspirador')) {
      return {
        content: 'Descreva os personagens principais (traços, roupas):',
        meta: 'Passo: Personagens',
      };
    }

    if (input.includes('davi:') || input.includes('golias:')) {
      return {
        content: 'Agora o ambiente/cenário:',
        meta: 'Passo: Ambiente',
      };
    }

    if (
      input.includes('vale') ||
      input.includes('elá') ||
      input.includes('colinas')
    ) {
      return {
        content: `Ângulos e movimentos de câmera?
Exemplos: <code class="inline">close</code>, <code class="inline">médio</code>, <code class="inline">aéreo</code>, 
<code class="inline">tracking</code>, <code class="inline">push in</code>.`,
        meta: 'Passo: Câmera',
      };
    }

    if (
      input.includes('aéreo') ||
      input.includes('tracking') ||
      input.includes('close')
    ) {
      return {
        content: `Iluminação/estilo?
${['Manhã', 'Pôr do sol', 'Natural', 'Cinematográfico']
  .map(tag => `<span class="tag">${tag}</span>`)
  .join('')}`,
        meta: 'Passo: Luz',
      };
    }

    if (input.includes('pôr do sol') || input.includes('luz quente')) {
      return {
        content: 'Ações/diálogos-chave (inclua emoções):',
        meta: 'Passo: Ação & Diálogo',
      };
    }

    if (
      input.includes('senhor dos exércitos') ||
      input.includes('estilingue')
    ) {
      return {
        content: 'Quer adicionar cut to scenes para contexto?',
        meta: 'Passo: Cut to Scenes',
      };
    }

    if (
      input.includes('corte') ||
      input.includes('exército') ||
      input.includes('israel')
    ) {
      return {
        content: 'Duração e formato do vídeo?',
        meta: 'Passo: Duração & Formato',
      };
    }

    if (
      input.includes('45') ||
      input.includes('segundos') ||
      input.includes('vertical')
    ) {
      return {
        content: 'Narração (voz/idioma/ritmo) e trilha?',
        meta: 'Passo: Voz & Música',
      };
    }

    if (
      input.includes('português') ||
      input.includes('masculina') ||
      input.includes('épica')
    ) {
      return {
        content: 'Elementos de marca/legendas/CTA?',
        meta: 'Passo: Marca & CTA',
      };
    }

    if (input.includes('jornada da fé') || input.includes('escrituras')) {
      return {
        content: `Ótimo! Montei o <strong>preview do prompt</strong> de vídeo com base nas suas respostas:
<div class="preview">
[CHARACTER DESCRIPTION] Davi (jovem pastor, túnica de linho, estilingue) e Golias (guerreiro alto com armadura de bronze).<br>
[CAMERA ANGLE/MOVEMENT] Aéreo do vale → tracking em Davi → close "push in" no lançamento.<br>
[ENVIRONMENT DETAILS] Vale de Elá, colinas, exércitos opostos observando.<br>
[LIGHTING/STYLE] Pôr do sol, cinematográfico, quente e inspirador.<br>
[ACTION/DIALOGUE] Davi confiante: "Eu vou em nome do Senhor dos Exércitos." Golias ri; pedra acerta a testa.<br>
[CUT TO SCENES] Reação dos israelitas: suspense → celebração.<br>
[DURAÇÃO/FORMATO] 45s, 9:16.<br>
[NARRAÇÃO] PT-BR masc., ritmo firme.<br>
[MÚSICA/SFX] Épica leve com percussão.<br>
[BRANDING/CTA] Logo "Jornada da Fé", CTA final: "Conheça as Escrituras completas".
</div>
Deseja <strong>aprovar</strong> ou <strong>editar</strong> alguma seção?`,
        meta: 'Passo: Revisão',
      };
    }

    if (input.includes('aprovar')) {
      return {
        content: 'Enviando o prompt ao motor de geração… ✅',
        meta: 'Passo: Geração',
      };
    }

    if (input.includes('gerado') || input.includes('preview')) {
      return {
        content:
          'Vídeo gerado! Aqui está um preview (simulado). Deseja baixar ou compartilhar?',
        meta: 'Resultado',
      };
    }

    if (input.includes('baixar') || input.includes('compartilhar')) {
      return {
        content: `Gostaria de adquirir uma <strong>cópia das Escrituras</strong> para aprofundar-se nesta história?
Temos formato <em>Digital</em> (PDF/ePub) e <em>Físico</em>.`,
        meta: 'Oferta',
      };
    }

    if (input.includes('digital')) {
      return {
        content:
          'Perfeito! Informe um e-mail para receber o link de download e a licença de uso.',
        meta: 'Checkout',
      };
    }

    if (input.includes('@') && input.includes('.')) {
      return {
        content: `Pagamento concluído via PIX. ✅
Enviamos o link de download para <strong>${userInput}</strong>.
Precisa de algo mais?`,
        meta: 'Confirmação & Encerramento',
      };
    }

    if (input.includes('obrigado') || input.includes('tudo certo')) {
      return {
        content: `Obrigado você! 🙏
Se quiser, posso reutilizar suas preferências para o próximo vídeo.`,
        meta: 'Fim',
      };
    }

    return {
      content: 'Entendi! Pode me dar mais detalhes sobre o que você gostaria?',
      meta: 'Assistente',
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(currentInput);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Compartilhado */}
      <Header showBackButton={true} backButtonText="Voltar ao Início" />

      {/* Main Content */}
      <main className="container py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-8 mx-auto">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-5xl font-bold text-card-foreground mb-6">
            Chatbot Bíblico
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Crie vídeos bíblicos incríveis com a ajuda da nossa IA. Escolha uma
            história, personalize o estilo e gere um vídeo profissional em
            minutos.
          </p>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            {/* Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.type === 'bot'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <div
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                    {message.meta && (
                      <div className="text-xs opacity-70 mt-2">
                        {message.meta}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={e => setCurrentInput(e.target.value)}
                placeholder="Digite sua resposta..."
                className="flex-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!currentInput.trim() || isTyping}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-card-foreground mb-2">
                Exemplo: Davi vs Golias - A Fé Triunfa
              </h3>
              <p className="text-muted-foreground">
                Veja um exemplo de vídeo bíblico gerado com IA
              </p>
            </div>

            <div className="relative w-full max-w-2xl mx-auto">
              <video
                controls
                className="w-full h-auto rounded-lg shadow-lg"
                poster="/api/placeholder/800/450"
              >
                <source
                  src="/resources/Davi_vs_Golias_A_Fé_Triunfa.mp4"
                  type="video/mp4"
                />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Este vídeo foi criado seguindo o fluxo de conversa acima
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-3xl font-bold text-card-foreground mb-6">
              Sobre este Chatbot
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              Este chatbot foi projetado para ajudá-lo a criar vídeos bíblicos
              profissionais:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Escolha de histórias bíblicas
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Personalização de estilo e tom
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Configuração técnica avançada
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-muted-foreground">
                  Geração de prompts profissionais
                </span>
              </li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>Observação:</strong> Este chatbot gera prompts para
                criação de vídeos. O resultado final depende da ferramenta de
                geração de vídeo utilizada.
              </p>
            </div>
          </div>
        </section>

        {/* Try Now Section */}
        <section className="mb-16">
          <div className="bg-gradient-primary rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Experimente agora!
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6">
              Inicie uma conversa para criar seu primeiro vídeo bíblico com IA.
            </p>
            <button
              onClick={() => {
                const input = document.querySelector(
                  'input[type="text"]'
                ) as HTMLInputElement;
                if (input) {
                  input.focus();
                }
              }}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Iniciar Conversa
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-3xl font-bold text-card-foreground mb-8">
              Perguntas Frequentes
            </h3>
            <div className="space-y-6">
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Quais histórias bíblicas estão disponíveis?
                </h4>
                <p className="text-muted-foreground">
                  Temos as principais histórias como Davi e Golias, Noé, Êxodo,
                  Nascimento de Jesus, Ressurreição e muitas outras.
                </p>
              </div>
              <div className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  Posso personalizar o estilo do vídeo?
                </h4>
                <p className="text-muted-foreground">
                  Sim! Você pode escolher entre estilos épico, didático,
                  cinematográfico ou suave, além de configurar iluminação,
                  ângulos de câmera e muito mais.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container py-12">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Gwan Company. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles for Chat Elements */}
      <style>{`
        .tag {
          display: inline-block;
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          background: hsl(var(--muted));
          color: hsl(var(--muted-foreground));
          font-size: 0.75rem;
          margin-right: 0.375rem;
          margin-bottom: 0.25rem;
        }
        
        .inline {
          background: hsl(var(--muted) / 0.5);
          padding: 0.15rem 0.35rem;
          border-radius: 0.375rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          color: hsl(var(--muted-foreground));
          font-size: 0.875rem;
        }
        
        .preview {
          background: hsl(var(--muted) / 0.3);
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          padding: 0.75rem;
          margin-top: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default BibleChatbotPage;
