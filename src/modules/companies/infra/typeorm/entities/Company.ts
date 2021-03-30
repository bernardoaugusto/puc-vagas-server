import User from '@modules/users/infra/typeorm/entities/User';
import Vacancy from '@modules/vacancies/infra/typeorm/entities/Vacancy';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity('companies')
export default class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, user => user.companies)
  users: User[];

  @OneToMany(() => Vacancy, vacancy => vacancy.company)
  vacancies: Vacancy[];
}
