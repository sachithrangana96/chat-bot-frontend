export interface IMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  bot: string;
  user: string
}