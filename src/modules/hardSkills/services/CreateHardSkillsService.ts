import { inject, injectable } from 'tsyringe';

import HardSkills from '../infra/typeorm/entities/HardSkills';
import IHardSkillsCreateDTO from '../dtos/IHardSkillsCreateDTO';
import IHardSkillsRepositoryDTO from '../repositories/IHardSkillsRepositoryDTO';

@injectable()
export default class CreateHardSkillsService {
  constructor(
    @inject('HardSkillsRepository')
    private hardSkillsRepository: IHardSkillsRepositoryDTO,
  ) {}

  public async execute(hardSkillsData: IHardSkillsCreateDTO): Promise<HardSkills> {
    const hardSkills = new HardSkills();
    Object.assign(hardSkills, hardSkillsData);

    return this.hardSkillsRepository.create(hardSkills);
  }
}
