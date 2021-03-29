import { Repository, getRepository } from 'typeorm';
import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';

import SoftSkill from '../entities/SoftSkill';
import ISoftSkillRepository from '../../../repositories/ISoftSkillRepositoryDTO';

export default class SoftSkillRepository implements ISoftSkillRepository {
  private ormRepository: Repository<SoftSkill>;

  constructor() {
    this.ormRepository = getRepository(SoftSkill);
  }

  public async create(softSkillData: SoftSkill): Promise<SoftSkill> {
    const softSkill = this.ormRepository.create(softSkillData);

    return this.ormRepository.save(softSkill);
  }

  public async findById(id: string): Promise<SoftSkill | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async update(updates: SoftSkill): Promise<SoftSkill> {
    return this.ormRepository.save(updates);
  }

  public async getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: SoftSkill[]; count: number }> {
    const [data, count] = await this.ormRepository.findAndCount(options);

    return { data, count };
  }

  public async getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<SoftSkill[]> {
    return this.ormRepository.find(options);
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
