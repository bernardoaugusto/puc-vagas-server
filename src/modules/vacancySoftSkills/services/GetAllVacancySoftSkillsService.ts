import { inject, injectable } from 'tsyringe';
import {
  formatParamsToTypeOrmOptionsWithPaginate,
  formatParamsToTypeOrmOptionsWithoutPaginate,
  formatPaginateDataToResponse,
} from '@seidor-cloud-produtos/typeorm';

import VacancySoftSkills from '../infra/typeorm/entities/VacancySoftSkills';
import IVacancySoftSkillsRequestGetAllDTO from '../dtos/IVacancySoftSkillsRequestGetAllDTO';
import IVacancySoftSkillsRepositoryDTO from '../repositories/IVacancySoftSkillsRepositoryDTO';

@injectable()
export default class GetAllVacancySoftSkillsService {
  constructor(
    @inject('VacancySoftSkillsRepository')
    private vacancySoftSkillsRepository: IVacancySoftSkillsRepositoryDTO,
  ) {}

  public async execute(
    queryParams: IVacancySoftSkillsRequestGetAllDTO,
    withPagination: boolean,
  ): Promise<
    | VacancySoftSkills[]
    | ({
        data: VacancySoftSkills[];
      } & {
        count: number;
        limit: number;
        page: number;
        totalPages: number;
      })
  > {
    if (withPagination) {
      const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams, true);

      const arrayVacancySoftSkills = await this.vacancySoftSkillsRepository.getAllWithPagination(
        options,
      );

      return formatPaginateDataToResponse(queryParams, arrayVacancySoftSkills);
    }

    const options = formatParamsToTypeOrmOptionsWithoutPaginate(queryParams, true);

    return this.vacancySoftSkillsRepository.getAllWithoutPagination(options);
  }
}
