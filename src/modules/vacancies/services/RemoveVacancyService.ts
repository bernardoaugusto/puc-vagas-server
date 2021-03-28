import { inject, injectable } from 'tsyringe';

import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';
import GetByIdVacancyService from './GetByIdVacancyService';

@injectable()
export default class RemoveVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('GetByIdVacancyService')
    private getByIdVacancyService: GetByIdVacancyService,
  ) {}

  public async execute(vacancyId: string): Promise<void> {
    await this.getByIdVacancyService.execute(vacancyId);

    await this.vacancyRepository.remove(vacancyId);
  }
}
