import { inject, injectable } from 'tsyringe';

import HardSkills from '../infra/typeorm/entities/HardSkills';
import IHardSkillsUpdateDTO from '../dtos/IHardSkillsUpdateDTO';
import IHardSkillsRepositoryDTO from '../repositories/IHardSkillsRepositoryDTO';
import GetByIdHardSkillsService from './GetByIdHardSkillsService';

@injectable()
export default class UpdateHardSkillsService {
  constructor(
    @inject('HardSkillsRepository')
    private hardSkillsRepository: IHardSkillsRepositoryDTO,

    @inject('GetByIdHardSkillsService')
    private getByIdHardSkillsService: GetByIdHardSkillsService,
  ) {}

  public async execute(
    hardSkillsDataUpdates: IHardSkillsUpdateDTO,
    hardSkillsId: string,
  ): Promise<HardSkills> {
    const hardSkills = await this.getByIdHardSkillsService.execute(hardSkillsId);

    Object.assign(hardSkills, hardSkillsDataUpdates);

    return this.hardSkillsRepository.update(hardSkills);
  }
}
