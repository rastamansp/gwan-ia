import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatbotCardProps {
  name: string;
  description: string;
  accent: string;
  link: string;
}

const ChatbotCard = ({ name, description, accent, link }: ChatbotCardProps) => {
  return (
    <Card className="group hover:shadow-hover transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-4 mb-2">
          <div
            className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center group-hover:scale-110 transition-transform`}
          >
            <Bot className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
        </div>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end mt-auto">
        <Button variant="outline" className="w-full group/btn" asChild>
          <Link to={link}>
            Experimentar
            <Bot className="ml-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChatbotCard;
