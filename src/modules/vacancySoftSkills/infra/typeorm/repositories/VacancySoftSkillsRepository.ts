import { Repository, getRepository } from 'typeorm';
import typeorm from '@seidor-cloud-produtos/typeorm';

import VacancySoftSkills from '../entities/VacancySoftSkills';
import IVacancySoftSkillsRepository from '../../../repositories/IVacancySoftSkillsRepositoryDTO';

export default class VacancySoftSkillsRepository
  implements IVacancySoftSkillsRepository {
  private ormRepository: Repository<VacancySoftSkills>;

  constructor() {
    this.ormRepository = getRepository(VacancySoftSkills);
  }

  public async create(
    vacancySoftSkillsData: VacancySoftSkills,
  ): Promise<VacancySoftSkills> {
    const vacancySoftSkills = this.ormRepository.create(vacancySoftSkillsData);

    return this.ormRepository.save(vacancySoftSkills);
  }

  public async findById(id: string): Promise<VacancySoftSkills | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async findByVacancyIdAndSoftSkillSd(
    vacancy_id: string,
    soft_skill_id: string,
  ): Promise<VacancySoftSkills | undefined> {
    return this.ormRepository.findOne({ where: { vacancy_id, soft_skill_id } });
  }

  public async update(updates: VacancySoftSkills): Promise<VacancySoftSkills> {
    return this.ormRepository.save(updates);
  }

  public async getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: VacancySoftSkills[]; count: number }> {
    const [data, count] = await this.ormRepository.findAndCount(options);

    return { data, count };
  }

  public async getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<VacancySoftSkills[]> {
    return this.ormRepository.find(options);
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
