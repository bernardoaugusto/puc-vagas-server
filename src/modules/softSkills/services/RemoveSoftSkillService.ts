import { inject, injectable } from 'tsyringe';

import ISoftSkillRepositoryDTO from '../repositories/ISoftSkillRepositoryDTO';
import GetByIdSoftSkillService from './GetByIdSoftSkillService';

@injectable()
export default class RemoveSoftSkillService {
  constructor(
    @inject('SoftSkillRepository')
    private softSkillRepository: ISoftSkillRepositoryDTO,

    @inject('GetByIdSoftSkillService')
    private getByIdSoftSkillService: GetByIdSoftSkillService,
  ) {}

  public async execute(softSkillId: string): Promise<void> {
    await this.getByIdSoftSkillService.execute(softSkillId);

    await this.softSkillRepository.remove(softSkillId);
  }
}
