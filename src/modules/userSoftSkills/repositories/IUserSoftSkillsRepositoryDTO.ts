import typeorm from '@seidor-cloud-produtos/typeorm';

import UserSoftSkills from '../infra/typeorm/entities/UserSoftSkills';

export default interface IUserSoftSkillsRepository {
  create(userSoftSkillsData: Array<UserSoftSkills>): Promise<Array<UserSoftSkills>>;
  update(updates: UserSoftSkills): Promise<UserSoftSkills>;
  findById(id: string): Promise<UserSoftSkills | undefined>;
  findByUserIdAndSoftSkillSd(
    user_id: string,
    soft_skill_id: string,
  ): Promise<UserSoftSkills | undefined>;
  getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: UserSoftSkills[]; count: number }>;
  getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<UserSoftSkills[]>;
  remove(id: string): Promise<void>;
}
