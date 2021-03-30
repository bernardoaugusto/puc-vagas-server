import Company from '@modules/companies/infra/typeorm/entities/Company';
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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
  salary_range: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'uuid' })
  company_id: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ type: 'uuid' })
  recruiter_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'recruiter_id' })
  recruiter?: User;
}
