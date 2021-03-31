import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vacancy-soft-skills')
export default class VacancySoftSkills {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vacancy_id: string;

  @Column()
  soft_skill_id: string;

  @Column()
  stars: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
