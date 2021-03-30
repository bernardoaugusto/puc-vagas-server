import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import GetByIdCompanyService from '@modules/companies/services/GetByIdCompanyService';
import User from '../infra/typeorm/entities/User';
import ICreateCompanyEmployeeDTO from '../dtos/ICreateCompanyEmployeeDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class CreateSoftSkillService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GetByIdCompanyService')
    private getByIdCompanyService: GetByIdCompanyService,
  ) {}

  public async execute({
    recruiter_id,
    company_id,
  }: ICreateCompanyEmployeeDTO): Promise<User> {
    const recruter = await this.usersRepository.findById(recruiter_id);
    if (!recruter) throw new AppError('User not found', 404);
    if (recruter.is_contractor === false)
      throw new AppError('User is not a recruiter', 400);

    const companyFinded = await this.getByIdCompanyService.execute(company_id);

    const registeredRecruiter = recruter.companies.find(
      company => company.id === companyFinded.id,
    );
    if (registeredRecruiter)
      throw new AppError('The recruiter is already working at this company', 400);

    recruter.companies.push(companyFinded);

    return this.usersRepository.save(recruter);
  }
}
