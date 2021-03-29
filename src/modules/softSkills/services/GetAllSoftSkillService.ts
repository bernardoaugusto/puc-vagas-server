import { inject, injectable } from 'tsyringe';
import {
  formatParamsToTypeOrmOptionsWithPaginate,
  formatPaginateDataToResponse,
  formatParamsToTypeOrmOptionsWithoutPaginate,
} from '@seidor-cloud-produtos/typeorm';

import SoftSkill from '../infra/typeorm/entities/SoftSkill';
import ISoftSkillRequestGetAllDTO from '../dtos/ISoftSkillRequestGetAllDTO';
import ISoftSkillRepositoryDTO from '../repositories/ISoftSkillRepositoryDTO';

@injectable()
export default class GetAllSoftSkillService {
  constructor(
    @inject('SoftSkillRepository')
    private softSkillRepository: ISoftSkillRepositoryDTO,
  ) {}

  public async execute(
    queryParams: ISoftSkillRequestGetAllDTO,
    withPagination: boolean,
  ): Promise<
    | SoftSkill[]
    | ({
        data: SoftSkill[];
      } & {
        count: number;
        limit: number;
        page: number;
        totalPages: number;
      })
  > {
    if (withPagination) {
      const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams, true);
      const arraySoftSkill = await this.softSkillRepository.getAllWithPagination(
        options,
      );

      return formatPaginateDataToResponse(queryParams, arraySoftSkill);
    }

    const options = formatParamsToTypeOrmOptionsWithoutPaginate(queryParams, true);

    return this.softSkillRepository.getAllWithoutPagination(options);
  }
}
