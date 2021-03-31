import { Repository, getRepository } from 'typeorm';
import typeorm from '@seidor-cloud-produtos/typeorm';

import HardSkills from '../entities/HardSkills';
import IHardSkillsRepository from '../../../repositories/IHardSkillsRepositoryDTO';

export default class HardSkillsRepository implements IHardSkillsRepository {
  private ormRepository: Repository<HardSkills>;

  constructor() {
    this.ormRepository = getRepository(HardSkills);
  }

  public async create(hardSkillsData: HardSkills): Promise<HardSkills> {
    const hardSkills = this.ormRepository.create(hardSkillsData);

    return this.ormRepository.save(hardSkills);
  }

  public async findById(id: string): Promise<HardSkills | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async update(updates: HardSkills): Promise<HardSkills> {
    return this.ormRepository.save(updates);
  }

  public async getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: HardSkills[]; count: number }> {
    const [data, count] = await this.ormRepository.findAndCount(options);

    return { data, count };
  }

  public async getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<HardSkills[]> {
    return this.ormRepository.find(options);
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
