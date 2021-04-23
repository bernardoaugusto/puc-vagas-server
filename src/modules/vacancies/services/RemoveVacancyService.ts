/* eslint-disable @typescript-eslint/no-explicit-any */
import IHardSkillsRepositoryDTO from '@modules/hardSkills/repositories/IHardSkillsRepositoryDTO';
import IVacancySoftSkillsRepositoryDTO from '@modules/vacancySoftSkills/repositories/IVacancySoftSkillsRepositoryDTO';
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

    @inject('VacancySoftSkillsRepository')
    private vacancySoftSkillsRepository: IVacancySoftSkillsRepositoryDTO,

    @inject('HardSkillsRepository')
    private hardSkillsRepository: IHardSkillsRepositoryDTO,
  ) {}

  public async execute(vacancyId: string): Promise<void> {
    await this.getByIdVacancyService.execute(vacancyId);

    const vacancySoftSkills = await this.vacancySoftSkillsRepository.getAllWithoutPagination(
      <any>{ where: { vacancy_id: vacancyId } },
    );

    for (const vacancySoftSkill of vacancySoftSkills) {
      await this.vacancySoftSkillsRepository.remove(vacancySoftSkill.id);
    }

    const hardSkills = await this.hardSkillsRepository.getAllWithoutPagination(<any>{
      where: { vacancy_id: vacancyId },
    });

    for (const hardSkill of hardSkills) {
      await this.hardSkillsRepository.remove(hardSkill.id);
    }

    await this.vacancyRepository.remove(vacancyId);
  }
}
