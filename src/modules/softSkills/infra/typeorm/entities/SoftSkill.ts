import UserSoftSkills from '@modules/userSoftSkills/infra/typeorm/entities/UserSoftSkills';
import VacancySoftSkills from '@modules/vacancySoftSkills/infra/typeorm/entities/VacancySoftSkills';
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

  @OneToMany(
    () => VacancySoftSkills,
    vacancySoftSkills => vacancySoftSkills.soft_skill,
  )
  vacancy_soft_skills: VacancySoftSkills[];
}
