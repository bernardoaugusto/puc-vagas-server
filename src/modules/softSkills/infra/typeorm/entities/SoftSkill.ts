import UserSoftSkills from '@modules/userSoftSkills/infra/typeorm/entities/UserSoftSkills';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('soft-skills')
export default class SoftSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserSoftSkills, userSoftSkills => userSoftSkills.soft_skill)
  user_soft_skills: UserSoftSkills[];
}
