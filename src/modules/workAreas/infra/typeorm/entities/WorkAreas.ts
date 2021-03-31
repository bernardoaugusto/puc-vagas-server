import User from '@modules/users/infra/typeorm/entities/User';
import Vacancy from '@modules/vacancies/infra/typeorm/entities/Vacancy';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity('work-areas')
export default class WorkAreas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, user => user.work_areas)
  users: User[];

  @ManyToMany(() => Vacancy, vacancy => vacancy.work_areas)
  vacancy: Vacancy[];
}
