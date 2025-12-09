import { useState, useMemo } from 'react';
import martJourneysData from '../../data/chat/mart-journeys.json';
import type { Journey, ConvertedMessage } from '../../domain/chat/types';

interface JourneysData {
  journey: Journey[];
}

interface UseMartInteractionsResult {
  journeys: Journey[];
  selectedJourney: Journey | null;
  isViewingJourney: boolean;
  selectJourney: (journey: Journey | null) => void;
  convertJourneyToMessages: (journey: Journey) => ConvertedMessage[];
}

export const useMartInteractions = (): UseMartInteractionsResult => {
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

  const journeys = useMemo(() => {
    const data = martJourneysData as JourneysData;
    return data.journey || [];
  }, []);

  const convertJourneyToMessages = (
    journey: Journey
  ): ConvertedMessage[] => {
    const baseTime = new Date();
    baseTime.setHours(10, 0, 0, 0);

    return journey.messages.map((msg, index) => {
      const messageTime = new Date(baseTime);
      messageTime.setMinutes(baseTime.getMinutes() + index * 2);

      const hours = messageTime.getHours().toString().padStart(2, '0');
      const minutes = messageTime.getMinutes().toString().padStart(2, '0');
      const timestamp = `${hours}:${minutes}`;

      return {
        id: index + 1,
        sender: msg.from === 'concierge' ? 'mentor' : 'mentee',
        type: 'text' as const,
        content: msg.text,
        timestamp,
      };
    });
  };

  const selectJourney = (journey: Journey | null) => {
    setSelectedJourney(journey);
  };

  return {
    journeys,
    selectedJourney,
    isViewingJourney: selectedJourney !== null,
    selectJourney,
    convertJourneyToMessages,
  };
};

