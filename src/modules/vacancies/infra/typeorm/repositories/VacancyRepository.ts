import { Repository, getRepository, Not, In } from 'typeorm';
import typeorm from '@seidor-cloud-produtos/typeorm';

import Vacancy from '../entities/Vacancy';
import IVacancyRepository from '../../../repositories/IVacancyRepositoryDTO';

export default class VacancyRepository implements IVacancyRepository {
  private ormRepository: Repository<Vacancy>;

  constructor() {
    this.ormRepository = getRepository(Vacancy);
  }

  public async getAllVacanciesForUser(excluded_ids: string[]): Promise<Vacancy[]> {
    return this.ormRepository.find({
      where: {
        id: Not(In(excluded_ids)),
      },
    });
  }

  public async create(vacancyData: Vacancy): Promise<Vacancy> {
    const vacancy = this.ormRepository.create(vacancyData);

    return this.ormRepository.save(vacancy);
  }

  public async findById(id: string): Promise<Vacancy | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async update(updates: Vacancy): Promise<Vacancy> {
    return this.ormRepository.save(updates);
  }

  public async getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: Vacancy[]; count: number }> {
    const [data, count] = await this.ormRepository.findAndCount(options);

    return { data, count };
  }

  public async getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<Vacancy[]> {
    return this.ormRepository.find(options);
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
