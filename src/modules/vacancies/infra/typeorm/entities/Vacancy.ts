import Company from '@modules/companies/infra/typeorm/entities/Company';
import HardSkills from '@modules/hardSkills/infra/typeorm/entities/HardSkills';
import User from '@modules/users/infra/typeorm/entities/User';
import VacancySoftSkills from '@modules/vacancySoftSkills/infra/typeorm/entities/VacancySoftSkills';
import WorkAreas from '@modules/workAreas/infra/typeorm/entities/WorkAreas';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('vacancies')
export default class Vacancy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  start_salary_range: string;

  @Column({ nullable: true })
  end_salary_range: string;

  @Column({ type: 'date', nullable: true })
  end_date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'uuid' })
  company_id: string;

  @ManyToOne(() => Company, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ type: 'uuid' })
  recruiter_id: string;

  @ManyToOne(() => User, user => user.vacancies)
  @JoinColumn({ name: 'recruiter_id' })
  recruiter?: User;

  @OneToMany(
    () => VacancySoftSkills,
    vacancySoftSkills => vacancySoftSkills.vacancy,
    { eager: true },
  )
  vacancy_soft_skills: VacancySoftSkills[];

  @ManyToMany(() => WorkAreas, workAreas => workAreas.vacancy, { eager: true })
  @JoinTable()
  work_areas: WorkAreas[];

  @OneToMany(() => HardSkills, hardSkills => hardSkills.vacancy, { eager: true })
  hard_skills: HardSkills[];
}
