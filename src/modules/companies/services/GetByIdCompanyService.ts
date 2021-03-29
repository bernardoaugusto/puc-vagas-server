import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import Company from '../infra/typeorm/entities/Company';
import ICompanyRepositoryDTO from '../repositories/ICompanyRepositoryDTO';

@injectable()
export default class GetByIdCompanyService {
    constructor(
        @inject('CompanyRepository')
        private companyRepository: ICompanyRepositoryDTO,
    ) {}

    public async execute(id: string): Promise<Company> {
        const findedCompany = await this.companyRepository.findById(id);

        if (!findedCompany) throw new AppError('Company not found', 404);

        return findedCompany;
    }
}
