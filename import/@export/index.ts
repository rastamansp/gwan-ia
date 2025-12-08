/**
 * Arquivo de índice para facilitar importações
 * 
 * Exemplo de uso:
 * import { TestChatbotPage, PhoneMockup, ChatInterface } from '@export'
 */

// Páginas
export { TestChatbotPage } from './pages/TestChatbot.page'

// Componentes chatbot-showcase
export { PhoneMockup } from './components/chatbot-showcase/PhoneMockup'
export { ChatInterface } from './components/chatbot-showcase/ChatInterface'
export { ChatBubble } from './components/chatbot-showcase/ChatBubble'
export { WhatsAppHeader } from './components/chatbot-showcase/WhatsAppHeader'
export { EventCard } from './components/chatbot-showcase/EventCard'
export { InteractionsSelector } from './components/chatbot-showcase/InteractionsSelector'

// Componentes UI
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/ui/dialog'

// Hooks
export { useInteractions } from './hooks/useInteractions'

// Repositories
export { ChatRepository } from './repositories/ChatRepository'
export type { IChatRepository, SendMessageRequest, SendMessageResponse } from './repositories/IChatRepository'

// Utilitários
export { cn } from './utils/cn'

