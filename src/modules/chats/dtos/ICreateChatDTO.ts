export interface Message {
  message: string;
  action: 'SENT' | 'RECEIVED';
}

export interface Chats {
  user_id: string;
  messages: Array<Message>;
}

export default class Chat {
  user_id: string;

  chats: Array<Chats>;
}
