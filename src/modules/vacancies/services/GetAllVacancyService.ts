import { inject, injectable } from 'tsyringe';
import {
  formatParamsToTypeOrmOptionsWithPaginate,
  formatPaginateDataToResponse,
  formatParamsToTypeOrmOptionsWithoutPaginate,
} from '@seidor-cloud-produtos/typeorm';

import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyRequestGetAllDTO from '../dtos/IVacancyRequestGetAllDTO';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';

@injectable()
export default class GetAllVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,
  ) {}

  public async execute(
    queryParams: IVacancyRequestGetAllDTO,
    withPagination: boolean,
  ): Promise<
    | Vacancy[]
    | ({
        data: Vacancy[];
      } & {
        count: number;
        limit: number;
        page: number;
        totalPages: number;
      })
  > {
    if (withPagination) {
      const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams, true);
      const arrayVacancy = await this.vacancyRepository.getAllWithPagination(
        options,
      );

      return formatPaginateDataToResponse(queryParams, arrayVacancy);
    }

    const options = formatParamsToTypeOrmOptionsWithoutPaginate(queryParams, true);

    return this.vacancyRepository.getAllWithoutPagination(options);
  }
}
