import Vacancy from '@modules/vacancies/infra/typeorm/entities/Vacancy';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('hard-skills')
export default class HardSkills {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  vacancy_id: string;

  @Column()
  description: string;

  @Column()
  stars: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Vacancy, vacancy => vacancy.hard_skills)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy?: Vacancy;
}
