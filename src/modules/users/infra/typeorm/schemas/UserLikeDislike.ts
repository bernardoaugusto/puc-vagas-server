import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('user-likes-dislikes-matches')
export default class UserLikeDislike {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column()
  likes: Array<string>;

  @Column()
  dislikes: Array<string>;

  @Column()
  matches: Array<string>;
}
