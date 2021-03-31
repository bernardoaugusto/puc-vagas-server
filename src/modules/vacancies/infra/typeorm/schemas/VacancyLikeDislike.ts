import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('vacancy-likes-dislikes-matches')
export default class VacancyLikeDislike {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: 'uuid' })
  vacancy_id: string;

  @Column()
  likes: Array<string>;

  @Column()
  dislikes: Array<string>;

  @Column()
  matches: Array<string>;
}
