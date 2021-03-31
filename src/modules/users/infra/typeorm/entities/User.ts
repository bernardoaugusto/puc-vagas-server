import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Company from '@modules/companies/infra/typeorm/entities/Company';
import Vacancy from '@modules/vacancies/infra/typeorm/entities/Vacancy';
import UserSoftSkills from '@modules/userSoftSkills/infra/typeorm/entities/UserSoftSkills';
import UserToken from './UserToken';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  email: string;

  @Column({ comment: 'Pode ser CPF ou CNPJ' })
  identifier: string;

  @Column()
  phone_number: string;

  @Exclude()
  @Column({ default: true })
  active: boolean;

  @Exclude()
  @Column({ default: false })
  is_contractor: boolean;

  @Exclude()
  @Column({ default: false })
  is_teacher: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserToken, user_token => user_token.user)
  user_token?: Array<UserToken>;

  @ManyToMany(() => Company, company => company.users, { eager: true })
  @JoinTable()
  companies: Company[];

  @OneToMany(() => Vacancy, vacancy => vacancy.company)
  vacancies: Vacancy[];

  @OneToMany(() => UserSoftSkills, userSoftSkills => userSoftSkills.user)
  user_soft_skills: UserSoftSkills[];
}

export default User;
