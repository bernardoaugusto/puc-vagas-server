import { inject, injectable } from 'tsyringe';
import {
  formatParamsToTypeOrmOptionsWithPaginate,
  formatPaginateDataToResponse,
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
    const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams, true);

    if (withPagination) {
      const arrayVacancy = await this.vacancyRepository.getAllWithPagination(
        options,
      );

      return formatPaginateDataToResponse(queryParams, arrayVacancy);
    }

    return this.vacancyRepository.getAllWithoutPagination(options);
  }
}
