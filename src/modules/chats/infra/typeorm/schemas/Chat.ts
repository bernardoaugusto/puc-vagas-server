import { ObjectID } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

interface Message {
  message: string;
  action: 'SENT' | 'RECEIVED';
}

export interface ChatsWithAnotherUser {
  user_id: string;
  vacancy_id: string;
  messages: Array<Message>;
}

@Entity('chat')
export default class Chat {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column()
  chats: Array<ChatsWithAnotherUser>;
}
