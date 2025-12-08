export interface SendMessageRequest {
  message: string;
}

export interface FormattedResponseData {
  type?: string;
  suggestions?: string[];
  rawData?: unknown[];
  items?: unknown[];
}

export interface FormattedResponse {
  answer?: string;
  data?: FormattedResponseData;
}

export interface SendMessageResponse {
  answer: string;
  formattedResponse?: FormattedResponse;
  toolsUsed?: Array<{
    name: string;
    arguments: Record<string, unknown>;
  }>;
}

export interface IChatRepository {
  sendMessage(data: SendMessageRequest): Promise<SendMessageResponse>;
}

