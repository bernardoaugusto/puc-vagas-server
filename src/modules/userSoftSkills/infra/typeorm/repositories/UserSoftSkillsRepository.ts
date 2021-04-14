import { Repository, getRepository } from 'typeorm';
import typeorm from '@seidor-cloud-produtos/typeorm';

import UserSoftSkills from '../entities/UserSoftSkills';
import IUserSoftSkillsRepository from '../../../repositories/IUserSoftSkillsRepositoryDTO';

export default class UserSoftSkillsRepository implements IUserSoftSkillsRepository {
  private ormRepository: Repository<UserSoftSkills>;

  constructor() {
    this.ormRepository = getRepository(UserSoftSkills);
  }

  public async create(
    userSoftSkillsData: Array<UserSoftSkills>,
  ): Promise<Array<UserSoftSkills>> {
    const userSoftSkills = this.ormRepository.create(userSoftSkillsData);

    return this.ormRepository.save(userSoftSkills);
  }

  public async findById(id: string): Promise<UserSoftSkills | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByUserIdAndSoftSkillSd(
    user_id: string,
    soft_skill_id: string,
  ): Promise<UserSoftSkills | undefined> {
    return this.ormRepository.findOne({ where: { user_id, soft_skill_id } });
  }

  public async update(updates: UserSoftSkills): Promise<UserSoftSkills> {
    return this.ormRepository.save(updates);
  }

  public async getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: UserSoftSkills[]; count: number }> {
    const [data, count] = await this.ormRepository.findAndCount(options);

    return { data, count };
  }

  public async getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<UserSoftSkills[]> {
    return this.ormRepository.find(options);
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
