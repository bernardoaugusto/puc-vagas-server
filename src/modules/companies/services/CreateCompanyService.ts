import { inject, injectable } from 'tsyringe';

import Company from '../infra/typeorm/entities/Company';
import ICompanyCreateDTO from '../dtos/ICompanyCreateDTO';
import ICompanyRepositoryDTO from '../repositories/ICompanyRepositoryDTO';

@injectable()
export default class CreateCompanyService {
    constructor(
        @inject('CompanyRepository')
        private companyRepository: ICompanyRepositoryDTO,
    ) {}

    public async execute(companyData: ICompanyCreateDTO): Promise<Company> {
        const company = new Company();
        Object.assign(company, companyData);

        return this.companyRepository.create(company);
    }
}
