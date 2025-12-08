import { AxiosInstance } from 'axios'
import { IChatRepository, SendMessageRequest, SendMessageResponse } from './IChatRepository'
import axios from 'axios'

export class ChatRepository implements IChatRepository {
  constructor(private readonly httpClient: AxiosInstance) {}

  async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    try {
      const response = await this.httpClient.post('/chat', data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to send message: ${error.message}`)
      }
      throw error
    }
  }
}

