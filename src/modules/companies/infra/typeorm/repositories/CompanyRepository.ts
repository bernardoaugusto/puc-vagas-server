import { Repository, getRepository } from 'typeorm';
import typeorm from '@seidor-cloud-produtos/typeorm';

import Company from '../entities/Company';
import ICompanyRepository from '../../../repositories/ICompanyRepositoryDTO';

export default class CompanyRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async create(companyData: Company): Promise<Company> {
    const company = this.ormRepository.create(companyData);

    return this.ormRepository.save(company);
  }

  public async findById(id: string): Promise<Company | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async update(updates: Company): Promise<Company> {
    return this.ormRepository.save(updates);
  }

  public async getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: Company[]; count: number }> {
    const [data, count] = await this.ormRepository.findAndCount(options);

    return { data, count };
  }

  public async getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<Company[]> {
    return this.ormRepository.find(options);
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
