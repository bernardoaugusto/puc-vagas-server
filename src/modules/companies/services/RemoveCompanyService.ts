import { inject, injectable } from 'tsyringe';

import ICompanyRepositoryDTO from '../repositories/ICompanyRepositoryDTO';
import GetByIdCompanyService from './GetByIdCompanyService';

@injectable()
export default class RemoveCompanyService {
    constructor(
        @inject('CompanyRepository')
        private companyRepository: ICompanyRepositoryDTO,

        @inject('GetByIdCompanyService')
        private getByIdCompanyService: GetByIdCompanyService,
    ) {}

    public async execute(companyId: string): Promise<void> {
        await this.getByIdCompanyService.execute(companyId);

        await this.companyRepository.remove(companyId);
    }
}
