import SoftSkill from '@modules/softSkills/infra/typeorm/entities/SoftSkill';
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

@Entity('user-soft-skills')
export default class UserSoftSkills {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  soft_skill_id: string;

  @Column()
  stars: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.user_soft_skills)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => SoftSkill, softSkill => softSkill.user_soft_skills)
  @JoinColumn({ name: 'soft_skill_id' })
  soft_skill?: SoftSkill;
}
