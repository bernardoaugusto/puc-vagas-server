import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import HardSkills from '../infra/typeorm/entities/HardSkills';
import IHardSkillsRepositoryDTO from '../repositories/IHardSkillsRepositoryDTO';

@injectable()
export default class GetByIdHardSkillsService {
  constructor(
    @inject('HardSkillsRepository')
    private hardSkillsRepository: IHardSkillsRepositoryDTO,
  ) {}

  public async execute(id: string): Promise<HardSkills> {
    const findedHardSkills = await this.hardSkillsRepository.findById(id);

    if (!findedHardSkills) throw new AppError('HardSkills not found', 404);

    return findedHardSkills;
  }
}
