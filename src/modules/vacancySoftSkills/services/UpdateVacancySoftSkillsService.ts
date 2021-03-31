import { inject, injectable } from 'tsyringe';

import VacancySoftSkills from '../infra/typeorm/entities/VacancySoftSkills';
import IVacancySoftSkillsUpdateDTO from '../dtos/IVacancySoftSkillsUpdateDTO';
import IVacancySoftSkillsRepositoryDTO from '../repositories/IVacancySoftSkillsRepositoryDTO';
import GetByIdVacancySoftSkillsService from './GetByIdVacancySoftSkillsService';

@injectable()
export default class UpdateVacancySoftSkillsService {
  constructor(
    @inject('VacancySoftSkillsRepository')
    private vacancySoftSkillsRepository: IVacancySoftSkillsRepositoryDTO,

    @inject('GetByIdVacancySoftSkillsService')
    private getByIdVacancySoftSkillsService: GetByIdVacancySoftSkillsService,
  ) {}

  public async execute(
    vacancySoftSkillsDataUpdates: IVacancySoftSkillsUpdateDTO,
    vacancySoftSkillsId: string,
  ): Promise<VacancySoftSkills> {
    const vacancySoftSkills = await this.getByIdVacancySoftSkillsService.execute(
      vacancySoftSkillsId,
    );

    Object.assign(vacancySoftSkills, vacancySoftSkillsDataUpdates);

    return this.vacancySoftSkillsRepository.update(vacancySoftSkills);
  }
}
