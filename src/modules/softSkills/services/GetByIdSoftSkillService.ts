import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import SoftSkill from '../infra/typeorm/entities/SoftSkill';
import ISoftSkillRepositoryDTO from '../repositories/ISoftSkillRepositoryDTO';

@injectable()
export default class GetByIdSoftSkillService {
  constructor(
    @inject('SoftSkillRepository')
    private softSkillRepository: ISoftSkillRepositoryDTO,
  ) {}

  public async execute(id: string): Promise<SoftSkill> {
    const findedSoftSkill = await this.softSkillRepository.findById(id);

    if (!findedSoftSkill) throw new AppError('SoftSkill not found', 404);

    return findedSoftSkill;
  }
}
