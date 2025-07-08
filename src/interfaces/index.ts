export interface IMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface IChatRequest {
  message: string;
}

export interface IChatResponse {
  bot: string;
  user: string
}