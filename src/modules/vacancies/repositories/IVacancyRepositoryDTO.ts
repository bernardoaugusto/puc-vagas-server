import typeorm from '@seidor-cloud-produtos/typeorm';

import Vacancy from '../infra/typeorm/entities/Vacancy';

export default interface IVacancyRepository {
  create(vacancyData: Vacancy): Promise<Vacancy>;
  update(updates: Vacancy): Promise<Vacancy>;
  findById(id: string): Promise<Vacancy | undefined>;
  getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: Vacancy[]; count: number }>;
  getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<Vacancy[]>;
  remove(id: string): Promise<void>;
  getAllVacanciesForUser(excluded_ids: Array<string>): Promise<Array<Vacancy>>;
}
