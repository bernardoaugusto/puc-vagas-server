import { inject, injectable } from 'tsyringe';

import GetByIdVacancyService from '@modules/vacancies/services/GetByIdVacancyService';
import GetByIdSoftSkillService from '@modules/softSkills/services/GetByIdSoftSkillService';
import AppError from '@shared/errors/AppError';
import VacancySoftSkills from '../infra/typeorm/entities/VacancySoftSkills';
import IVacancySoftSkillsCreateDTO from '../dtos/IVacancySoftSkillsCreateDTO';
import IVacancySoftSkillsRepositoryDTO from '../repositories/IVacancySoftSkillsRepositoryDTO';

@injectable()
export default class CreateVacancySoftSkillsService {
  constructor(
    @inject('VacancySoftSkillsRepository')
    private vacancySoftSkillsRepository: IVacancySoftSkillsRepositoryDTO,

    @inject('GetByIdVacancyService')
    private getByIdVacancyService: GetByIdVacancyService,

    @inject('GetByIdSoftSkillService')
    private getByIdSoftSkillService: GetByIdSoftSkillService,
  ) {}

  public async execute(
    vacancySoftSkillsData: IVacancySoftSkillsCreateDTO,
  ): Promise<VacancySoftSkills> {
    await this.getByIdVacancyService.execute(vacancySoftSkillsData.vacancy_id);
    await this.getByIdSoftSkillService.execute(vacancySoftSkillsData.soft_skill_id);

    const vacancySoftSkillFinded = await this.vacancySoftSkillsRepository.findByVacancyIdAndSoftSkillSd(
      vacancySoftSkillsData.vacancy_id,
      vacancySoftSkillsData.soft_skill_id,
    );

    if (vacancySoftSkillFinded)
      throw new AppError('This vacancy already has this soft skill', 400);

    const vacancySoftSkills = new VacancySoftSkills();
    Object.assign(vacancySoftSkills, vacancySoftSkillsData);

    return this.vacancySoftSkillsRepository.create(vacancySoftSkills);
  }
}
