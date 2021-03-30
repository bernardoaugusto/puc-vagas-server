import { inject, injectable } from 'tsyringe';

import UserSoftSkills from '../infra/typeorm/entities/UserSoftSkills';
import IUserSoftSkillsUpdateDTO from '../dtos/IUserSoftSkillsUpdateDTO';
import IUserSoftSkillsRepositoryDTO from '../repositories/IUserSoftSkillsRepositoryDTO';
import GetByIdUserSoftSkillsService from './GetByIdUserSoftSkillsService';

@injectable()
export default class UpdateUserSoftSkillsService {
    constructor(
        @inject('UserSoftSkillsRepository')
        private userSoftSkillsRepository: IUserSoftSkillsRepositoryDTO,

        @inject('GetByIdUserSoftSkillsService')
        private getByIdUserSoftSkillsService: GetByIdUserSoftSkillsService,
    ) {}

    public async execute(
        userSoftSkillsDataUpdates: IUserSoftSkillsUpdateDTO,
        userSoftSkillsId: string,
    ): Promise<UserSoftSkills> {
        const userSoftSkills = await this.getByIdUserSoftSkillsService.execute(userSoftSkillsId);

        Object.assign(userSoftSkills, userSoftSkillsDataUpdates);

        return this.userSoftSkillsRepository.update(userSoftSkills);
    }
}
