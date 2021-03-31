import { inject, injectable } from 'tsyringe';
import {
  formatParamsToTypeOrmOptionsWithPaginate,
  formatParamsToTypeOrmOptionsWithoutPaginate,
  formatPaginateDataToResponse,
} from '@seidor-cloud-produtos/typeorm';

import HardSkills from '../infra/typeorm/entities/HardSkills';
import IHardSkillsRequestGetAllDTO from '../dtos/IHardSkillsRequestGetAllDTO';
import IHardSkillsRepositoryDTO from '../repositories/IHardSkillsRepositoryDTO';

@injectable()
export default class GetAllHardSkillsService {
  constructor(
    @inject('HardSkillsRepository')
    private hardSkillsRepository: IHardSkillsRepositoryDTO,
  ) {}

  public async execute(
    queryParams: IHardSkillsRequestGetAllDTO,
    withPagination: boolean,
  ): Promise<
    | HardSkills[]
    | ({
        data: HardSkills[];
      } & {
        count: number;
        limit: number;
        page: number;
        totalPages: number;
      })
  > {
    if (withPagination) {
      const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams, true);

      const arrayHardSkills = await this.hardSkillsRepository.getAllWithPagination(
        options,
      );

      return formatPaginateDataToResponse(queryParams, arrayHardSkills);
    }

    const options = formatParamsToTypeOrmOptionsWithoutPaginate(queryParams, true);

    return this.hardSkillsRepository.getAllWithoutPagination(options);
  }
}
