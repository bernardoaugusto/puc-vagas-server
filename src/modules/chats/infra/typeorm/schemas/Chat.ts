import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

interface Message {
  message: string;
  action: 'SENT' | 'RECEIVED';
}

interface Chats {
  user_id: string;
  messages: Array<Message>;
}

@Entity('chat')
export default class Chat {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column()
  chats: Array<Chats>;
}
