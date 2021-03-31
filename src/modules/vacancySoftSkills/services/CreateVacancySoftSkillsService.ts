import { inject, injectable } from 'tsyringe';

import VacancySoftSkills from '../infra/typeorm/entities/VacancySoftSkills';
import IVacancySoftSkillsCreateDTO from '../dtos/IVacancySoftSkillsCreateDTO';
import IVacancySoftSkillsRepositoryDTO from '../repositories/IVacancySoftSkillsRepositoryDTO';

@injectable()
export default class CreateVacancySoftSkillsService {
  constructor(
    @inject('VacancySoftSkillsRepository')
    private vacancySoftSkillsRepository: IVacancySoftSkillsRepositoryDTO,
  ) {}

  public async execute(
    vacancySoftSkillsData: IVacancySoftSkillsCreateDTO,
  ): Promise<VacancySoftSkills> {
    const vacancySoftSkills = new VacancySoftSkills();
    Object.assign(vacancySoftSkills, vacancySoftSkillsData);

    return this.vacancySoftSkillsRepository.create(vacancySoftSkills);
  }
}
