import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import GetByIdSoftSkillService from '@modules/softSkills/services/GetByIdSoftSkillService';
import UserSoftSkills from '../infra/typeorm/entities/UserSoftSkills';
import IUserSoftSkillsCreateDTO from '../dtos/IUserSoftSkillsCreateDTO';
import IUserSoftSkillsRepositoryDTO from '../repositories/IUserSoftSkillsRepositoryDTO';

@injectable()
export default class CreateUserSoftSkillsService {
  constructor(
    @inject('UserSoftSkillsRepository')
    private userSoftSkillsRepository: IUserSoftSkillsRepositoryDTO,

    @inject('GetByIdSoftSkillService')
    private getByIdSoftSkillService: GetByIdSoftSkillService,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    usersSoftSkillsCreate: Array<IUserSoftSkillsCreateDTO>,
  ): Promise<Array<UserSoftSkills>> {
    const createSoftSkills: Array<UserSoftSkills> = [];

    for (const userSoftSkillsCreate of usersSoftSkillsCreate) {
      const { user_id, soft_skill_id, stars } = userSoftSkillsCreate;

      const user = await this.usersRepository.findById(user_id);
      if (!user) throw new AppError(`User not found. ID: ${user}`, 404);

      await this.getByIdSoftSkillService.execute(soft_skill_id);

      const userSoftSkillFinded = await this.userSoftSkillsRepository.findByUserIdAndSoftSkillSd(
        user_id,
        soft_skill_id,
      );

      if (userSoftSkillFinded)
        throw new AppError(
          `This user already has this soft skill. ID: ${userSoftSkillFinded}`,
          400,
        );

      const userSoftSkills = new UserSoftSkills();
      createSoftSkills.push(
        Object.assign(userSoftSkills, { soft_skill_id, user_id, stars }),
      );
    }

    return this.userSoftSkillsRepository.create(createSoftSkills);
  }
}
