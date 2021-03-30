import typeorm from '@seidor-cloud-produtos/typeorm';

import Company from '../infra/typeorm/entities/Company';

export default interface ICompanyRepository {
  create(companyData: Company): Promise<Company>;
  update(updates: Company): Promise<Company>;
  findById(id: string): Promise<Company | undefined>;
  getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: Company[]; count: number }>;
  getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<Company[]>;
  remove(id: string): Promise<void>;
}
