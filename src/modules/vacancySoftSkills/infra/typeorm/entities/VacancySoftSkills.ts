import SoftSkill from '@modules/softSkills/infra/typeorm/entities/SoftSkill';
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

@Entity('vacancy-soft-skills')
export default class VacancySoftSkills {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  vacancy_id: string;

  @Column({ type: 'uuid' })
  soft_skill_id: string;

  @Column()
  stars: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Vacancy, vacancy => vacancy.vacancy_soft_skills)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy?: Vacancy;

  @ManyToOne(() => SoftSkill, softSkill => softSkill.vacancy_soft_skills)
  @JoinColumn({ name: 'soft_skill_id' })
  soft_skill?: SoftSkill;
}
