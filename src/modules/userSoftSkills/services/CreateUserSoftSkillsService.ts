import { inject, injectable } from 'tsyringe';

import UserSoftSkills from '../infra/typeorm/entities/UserSoftSkills';
import IUserSoftSkillsCreateDTO from '../dtos/IUserSoftSkillsCreateDTO';
import IUserSoftSkillsRepositoryDTO from '../repositories/IUserSoftSkillsRepositoryDTO';

@injectable()
export default class CreateUserSoftSkillsService {
    constructor(
        @inject('UserSoftSkillsRepository')
        private userSoftSkillsRepository: IUserSoftSkillsRepositoryDTO,
    ) {}

    public async execute(userSoftSkillsData: IUserSoftSkillsCreateDTO): Promise<UserSoftSkills> {
        const userSoftSkills = new UserSoftSkills();
        Object.assign(userSoftSkills, userSoftSkillsData);

        return this.userSoftSkillsRepository.create(userSoftSkills);
    }
}
