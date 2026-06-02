import React, { useState } from 'react';
import { CalendarDays, MessageSquareText, RotateCcw } from 'lucide-react';
import { PhoneMockup } from '../../presentation/chatbot-showcase/PhoneMockup';
import { ChatInterface } from '../../presentation/chatbot-showcase/ChatInterface';
import { InteractionsSelector } from '../../presentation/chatbot-showcase/InteractionsSelector';
import { useInteractions } from '../../application/chat/useInteractions';
import { ChatRepository } from '../../infrastructure/chat/ChatRepository';
import { createEventsHttpClient } from '../../infrastructure/http/eventsHttpClient';
import Header from '../../components/layout/Header';
import Footer from '../../components/Footer';
import { Button } from '@/components/ui/button';
import type { Journey } from '../../domain/chat/types';

const BotGwanEventsPage: React.FC = () => {
  const [isInteractionsOpen, setIsInteractionsOpen] = useState(false);
  const { selectedJourney, selectJourney, convertJourneyToMessages } =
    useInteractions();

  // Criar instância do repository com HTTP client configurado
  const httpClient = createEventsHttpClient();
  const chatRepository = new ChatRepository(httpClient);

  const handleSelectJourney = (journey: Journey) => {
    selectJourney(journey);
  };

  const handleResetChat = () => {
    selectJourney(null);
  };

  const journeyMessages = selectedJourney
    ? convertJourneyToMessages(selectedJourney)
    : undefined;
  const headerName = selectedJourney ? 'Gwan Eventos — Assistente' : undefined;
  const headerAvatar = selectedJourney ? '🤖' : undefined;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 min-h-[calc(100vh-6rem)]">
          <div className="flex-1 max-w-2xl text-center lg:text-left space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <CalendarDays className="h-4 w-4" />
              Chatbot Gwan Eventos
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              Experimente o
              <span className="block text-primary animate-gradient">
                Chatbot Gwan Eventos
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Experimente diferentes jornadas de conversação e veja como nosso
              chatbot inteligente guia usuários desde o primeiro contato até a
              compra de ingressos para eventos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="text-base shadow-glow-primary"
                onClick={() => setIsInteractionsOpen(true)}
              >
                <MessageSquareText className="mr-2 h-5 w-5" />
                Ver Jornadas de Conversação
              </Button>
              {selectedJourney && (
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base"
                  onClick={handleResetChat}
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Voltar ao Chat Padrão
                </Button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">6</div>
                <div className="text-sm text-muted-foreground">
                  Jornadas Disponíveis
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Interativo</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">IA</div>
                <div className="text-sm text-muted-foreground">Inteligente</div>
              </div>
            </div>
          </div>

          <div
            className="flex-shrink-0 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <PhoneMockup>
              <ChatInterface
                journeyMessages={journeyMessages}
                headerName={headerName}
                headerAvatar={headerAvatar}
                chatRepository={chatRepository}
              />
            </PhoneMockup>
          </div>
        </div>
      </div>

      <InteractionsSelector
        open={isInteractionsOpen}
        onOpenChange={setIsInteractionsOpen}
        onSelectJourney={handleSelectJourney}
      />

      <Footer />
    </div>
  );
};

export default BotGwanEventsPage;
