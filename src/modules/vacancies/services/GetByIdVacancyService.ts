import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';

@injectable()
export default class GetByIdVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,
  ) {}

  public async execute(id: string): Promise<Vacancy> {
    const findedVacancy = await this.vacancyRepository.findById(id);

    if (!findedVacancy) throw new AppError('Vacancy not found', 404);

    return findedVacancy;
  }
}
