import { inject, injectable } from 'tsyringe';

import SoftSkill from '../infra/typeorm/entities/SoftSkill';
import ISoftSkillCreateDTO from '../dtos/ISoftSkillCreateDTO';
import ISoftSkillRepositoryDTO from '../repositories/ISoftSkillRepositoryDTO';

@injectable()
export default class CreateSoftSkillService {
  constructor(
    @inject('SoftSkillRepository')
    private softSkillRepository: ISoftSkillRepositoryDTO,
  ) {}

  public async execute(softSkillData: ISoftSkillCreateDTO): Promise<SoftSkill> {
    const softSkill = new SoftSkill();
    Object.assign(softSkill, softSkillData);

    return this.softSkillRepository.create(softSkill);
  }
}
