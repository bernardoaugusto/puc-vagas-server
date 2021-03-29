import { inject, injectable } from 'tsyringe';
import typeorm from '@seidor-cloud-produtos/typeorm';

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
    const options = typeorm.formatParamsToTypeOrmOptionsWithPaginate(queryParams);

    if (withPagination) {
      const arraySoftSkill = await this.softSkillRepository.getAllWithPagination(
        options,
      );

      return typeorm.formatPaginateDataToResponse(queryParams, arraySoftSkill);
    }

    return this.softSkillRepository.getAllWithoutPagination(options);
  }
}
