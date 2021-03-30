import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import GetByIdCompanyService from '@modules/companies/services/GetByIdCompanyService';
import User from '@modules/users/infra/typeorm/entities/User';
import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyCreateDTO from '../dtos/IVacancyCreateDTO';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';

@injectable()
export default class CreateVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GetByIdCompanyService')
    private getByIdCompanyService: GetByIdCompanyService,
  ) {}

  public async execute(
    vacancyData: IVacancyCreateDTO,
    user: {
      id: string;
      is_contractor: boolean;
      is_teacher: boolean;
    },
  ): Promise<Vacancy> {
    if (!user.is_contractor) throw new AppError('User is not a recruiter', 400);

    const recruiter = (await this.usersRepository.findById(user.id)) as User;
    const companyFinded = await this.getByIdCompanyService.execute(
      vacancyData.company_id,
    );

    const registeredRecruiter = recruiter.companies.find(
      company => company.id === companyFinded.id,
    );

    if (registeredRecruiter)
      throw new AppError('The recruiter is already working at this company', 400);

    const vacancy = new Vacancy();
    Object.assign(vacancy, { ...vacancyData, recruiter_id: recruiter.id });

    return this.vacancyRepository.create(vacancy);
  }
}
