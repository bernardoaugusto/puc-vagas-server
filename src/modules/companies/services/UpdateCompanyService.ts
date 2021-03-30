import { inject, injectable } from 'tsyringe';

import Company from '../infra/typeorm/entities/Company';
import ICompanyUpdateDTO from '../dtos/ICompanyUpdateDTO';
import ICompanyRepositoryDTO from '../repositories/ICompanyRepositoryDTO';
import GetByIdCompanyService from './GetByIdCompanyService';

@injectable()
export default class UpdateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepositoryDTO,

    @inject('GetByIdCompanyService')
    private getByIdCompanyService: GetByIdCompanyService,
  ) {}

  public async execute(
    companyDataUpdates: ICompanyUpdateDTO,
    companyId: string,
  ): Promise<Company> {
    const company = await this.getByIdCompanyService.execute(companyId);

    Object.assign(company, companyDataUpdates);

    return this.companyRepository.update(company);
  }
}
