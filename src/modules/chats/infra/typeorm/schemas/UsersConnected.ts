import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity('users-connected')
export default class Chat {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column()
  client_id: string;
}
