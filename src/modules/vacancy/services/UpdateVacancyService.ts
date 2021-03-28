import { inject, injectable } from 'tsyringe';

import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyUpdateDTO from '../dtos/IVacancyUpdateDTO';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';
import GetByIdVacancyService from './GetByIdVacancyService';

@injectable()
export default class UpdateVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('GetByIdVacancyService')
    private getByIdVacancyService: GetByIdVacancyService,
  ) {}

  public async execute(
    vacancyDataUpdates: IVacancyUpdateDTO,
    vacancyId: string,
  ): Promise<Vacancy> {
    const vacancy = await this.getByIdVacancyService.execute(vacancyId);

    Object.assign(vacancy, vacancyDataUpdates);

    return this.vacancyRepository.update(vacancy);
  }
}
