import { inject, injectable } from 'tsyringe';

import IHardSkillsRepositoryDTO from '../repositories/IHardSkillsRepositoryDTO';
import GetByIdHardSkillsService from './GetByIdHardSkillsService';

@injectable()
export default class RemoveHardSkillsService {
  constructor(
    @inject('HardSkillsRepository')
    private hardSkillsRepository: IHardSkillsRepositoryDTO,

    @inject('GetByIdHardSkillsService')
    private getByIdHardSkillsService: GetByIdHardSkillsService,
  ) {}

  public async execute(hardSkillsId: string): Promise<void> {
    await this.getByIdHardSkillsService.execute(hardSkillsId);

    await this.hardSkillsRepository.remove(hardSkillsId);
  }
}
