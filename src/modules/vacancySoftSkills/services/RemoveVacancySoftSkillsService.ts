import { inject, injectable } from 'tsyringe';

import IVacancySoftSkillsRepositoryDTO from '../repositories/IVacancySoftSkillsRepositoryDTO';
import GetByIdVacancySoftSkillsService from './GetByIdVacancySoftSkillsService';

@injectable()
export default class RemoveVacancySoftSkillsService {
  constructor(
    @inject('VacancySoftSkillsRepository')
    private vacancySoftSkillsRepository: IVacancySoftSkillsRepositoryDTO,

    @inject('GetByIdVacancySoftSkillsService')
    private getByIdVacancySoftSkillsService: GetByIdVacancySoftSkillsService,
  ) {}

  public async execute(vacancySoftSkillsId: string): Promise<void> {
    await this.getByIdVacancySoftSkillsService.execute(vacancySoftSkillsId);

    await this.vacancySoftSkillsRepository.remove(vacancySoftSkillsId);
  }
}
