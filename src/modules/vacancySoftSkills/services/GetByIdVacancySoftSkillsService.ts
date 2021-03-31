import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import VacancySoftSkills from '../infra/typeorm/entities/VacancySoftSkills';
import IVacancySoftSkillsRepositoryDTO from '../repositories/IVacancySoftSkillsRepositoryDTO';

@injectable()
export default class GetByIdVacancySoftSkillsService {
  constructor(
    @inject('VacancySoftSkillsRepository')
    private vacancySoftSkillsRepository: IVacancySoftSkillsRepositoryDTO,
  ) {}

  public async execute(id: string): Promise<VacancySoftSkills> {
    const findedVacancySoftSkills = await this.vacancySoftSkillsRepository.findById(
      id,
    );

    if (!findedVacancySoftSkills)
      throw new AppError('VacancySoftSkills not found', 404);

    return findedVacancySoftSkills;
  }
}
