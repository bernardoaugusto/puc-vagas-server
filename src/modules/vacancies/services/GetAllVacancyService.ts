import { inject, injectable } from 'tsyringe';
import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';

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
    const options = typeorm.formatParamsToTypeOrmOptionsWithPaginate(queryParams);

    if (withPagination) {
      const arrayVacancy = await this.vacancyRepository.getAllWithPagination(
        options,
      );

      return typeorm.formatPaginateDataToResponse(queryParams, arrayVacancy);
    }

    return this.vacancyRepository.getAllWithoutPagination(options);
  }
}
