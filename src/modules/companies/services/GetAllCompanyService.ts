import { inject, injectable } from 'tsyringe';
import {
  formatParamsToTypeOrmOptionsWithPaginate,
  formatParamsToTypeOrmOptionsWithoutPaginate,
  formatPaginateDataToResponse,
} from '@seidor-cloud-produtos/typeorm';

import Company from '../infra/typeorm/entities/Company';
import ICompanyRequestGetAllDTO from '../dtos/ICompanyRequestGetAllDTO';
import ICompanyRepositoryDTO from '../repositories/ICompanyRepositoryDTO';

@injectable()
export default class GetAllCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepositoryDTO,
  ) {}

  public async execute(
    queryParams: ICompanyRequestGetAllDTO,
    withPagination: boolean,
  ): Promise<
    | Company[]
    | ({
        data: Company[];
      } & {
        count: number;
        limit: number;
        page: number;
        totalPages: number;
      })
  > {
    if (withPagination) {
      const options = formatParamsToTypeOrmOptionsWithPaginate(queryParams, true);

      const arrayCompany = await this.companyRepository.getAllWithPagination(
        options,
      );

      return formatPaginateDataToResponse(queryParams, arrayCompany);
    }

    const options = formatParamsToTypeOrmOptionsWithoutPaginate(queryParams, true);

    return this.companyRepository.getAllWithoutPagination(options);
  }
}
