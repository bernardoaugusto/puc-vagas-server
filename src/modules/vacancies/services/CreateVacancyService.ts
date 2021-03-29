import { inject, injectable } from 'tsyringe';

import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyCreateDTO from '../dtos/IVacancyCreateDTO';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';

@injectable()
export default class CreateVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,
  ) {}

  public async execute(vacancyData: IVacancyCreateDTO): Promise<Vacancy> {
    const vacancy = new Vacancy();
    Object.assign(vacancy, vacancyData);

    return this.vacancyRepository.create(vacancy);
  }
}
