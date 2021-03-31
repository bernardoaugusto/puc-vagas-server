import { inject, injectable } from 'tsyringe';

import IUserSoftSkillsRepositoryDTO from '../repositories/IUserSoftSkillsRepositoryDTO';
import GetByIdUserSoftSkillsService from './GetByIdUserSoftSkillsService';

@injectable()
export default class RemoveUserSoftSkillsService {
    constructor(
        @inject('UserSoftSkillsRepository')
        private userSoftSkillsRepository: IUserSoftSkillsRepositoryDTO,

        @inject('GetByIdUserSoftSkillsService')
        private getByIdUserSoftSkillsService: GetByIdUserSoftSkillsService,
    ) {}

    public async execute(userSoftSkillsId: string): Promise<void> {
        await this.getByIdUserSoftSkillsService.execute(userSoftSkillsId);

        await this.userSoftSkillsRepository.remove(userSoftSkillsId);
    }
}
