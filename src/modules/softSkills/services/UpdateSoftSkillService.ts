import { inject, injectable } from 'tsyringe';

import SoftSkill from '../infra/typeorm/entities/SoftSkill';
import ISoftSkillUpdateDTO from '../dtos/ISoftSkillUpdateDTO';
import ISoftSkillRepositoryDTO from '../repositories/ISoftSkillRepositoryDTO';
import GetByIdSoftSkillService from './GetByIdSoftSkillService';

@injectable()
export default class UpdateSoftSkillService {
    constructor(
        @inject('SoftSkillRepository')
        private softSkillRepository: ISoftSkillRepositoryDTO,

        @inject('GetByIdSoftSkillService')
        private getByIdSoftSkillService: GetByIdSoftSkillService,
    ) {}

    public async execute(
        softSkillDataUpdates: ISoftSkillUpdateDTO,
        softSkillId: string,
    ): Promise<SoftSkill> {
        const softSkill = await this.getByIdSoftSkillService.execute(softSkillId);

        Object.assign(softSkill, softSkillDataUpdates);

        return this.softSkillRepository.update(softSkill);
    }
}
