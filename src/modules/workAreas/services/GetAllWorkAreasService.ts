import { inject, injectable } from 'tsyringe';
import {
  formatParamsToTypeOrmOptionsWithPaginate,
  formatParamsToTypeOrmOptionsWithoutPaginate,
  formatPaginateDataToResponse,
} from '@seidor-cloud-produtos/typeorm';

import WorkAreas from '../infra/typeorm/entities/WorkAreas';
import IWorkAreasRequestGetAllDTO from '../dtos/IWorkAreasRequestGetAllDTO';
import IWorkAreasRepositoryDTO from '../repositories/IWorkAreasRepositoryDTO';

@injectable()
export default class GetAllWorkAreasService {
  constructor(
    @inject('WorkAreasRepository')
    private workAreasRepository: IWorkAreasRepositoryDTO,
  ) {}

  public async execute(
    queryParams: IWorkAreasRequestGetAllDTO,
    withPagination: boolean,
  ): Promise<
    | WorkAreas[]
    | ({
        data: WorkAreas[];
      } & {
        count: number;
        limit: number;
        page: number;
        totalPages: number;
      })
  > {
    if (withPagination) {
      const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams, true);

      const arrayWorkAreas = await this.workAreasRepository.getAllWithPagination(
        options,
      );

      return formatPaginateDataToResponse(queryParams, arrayWorkAreas);
    }

    const options = formatParamsToTypeOrmOptionsWithoutPaginate(queryParams, true);

    return this.workAreasRepository.getAllWithoutPagination(options);
  }
}
