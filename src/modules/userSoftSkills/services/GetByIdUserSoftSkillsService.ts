import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import UserSoftSkills from '../infra/typeorm/entities/UserSoftSkills';
import IUserSoftSkillsRepositoryDTO from '../repositories/IUserSoftSkillsRepositoryDTO';

@injectable()
export default class GetByIdUserSoftSkillsService {
    constructor(
        @inject('UserSoftSkillsRepository')
        private userSoftSkillsRepository: IUserSoftSkillsRepositoryDTO,
    ) {}

    public async execute(id: string): Promise<UserSoftSkills> {
        const findedUserSoftSkills = await this.userSoftSkillsRepository.findById(id);

        if (!findedUserSoftSkills) throw new AppError('UserSoftSkills not found', 404);

        return findedUserSoftSkills;
    }
}
