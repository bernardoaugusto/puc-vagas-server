import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IDeleteCompanyEmployeeDTO from '../dtos/IDeleteCompanyEmployeeDTO';

@injectable()
export default class DeleteCompanyEmployeeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    recruiter_id,
    company_id,
  }: IDeleteCompanyEmployeeDTO): Promise<User> {
    const recruter = await this.usersRepository.findById(recruiter_id);
    if (!recruter) throw new AppError('User not found', 404);
    if (recruter.is_contractor === false)
      throw new AppError('User is not a recruiter', 400);

    recruter.companies = recruter.companies.filter(
      company => company.id !== company_id,
    );

    return this.usersRepository.save(recruter);
  }
}
