import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';

import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyCreateDTO from '../dtos/IVacancyCreateDTO';

export default interface IVacancyRepository {
  create(vacancyData: IVacancyCreateDTO): Promise<Vacancy>;
  update(updates: Vacancy): Promise<Vacancy>;
  findById(id: string): Promise<Vacancy | undefined>;
  getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: Vacancy[]; count: number }>;
  getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<Vacancy[]>;
  remove(id: string): Promise<void>;
}
