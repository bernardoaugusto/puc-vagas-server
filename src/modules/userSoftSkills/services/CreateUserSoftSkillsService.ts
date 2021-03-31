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

  public async execute({
    soft_skill_id,
    user_id,
    stars,
  }: IUserSoftSkillsCreateDTO): Promise<UserSoftSkills> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) throw new AppError('User not found', 404);

    await this.getByIdSoftSkillService.execute(soft_skill_id);

    const userSoftSkillFinded = await this.userSoftSkillsRepository.findByUserIdAndSoftSkillSd(
      user_id,
      soft_skill_id,
    );

    if (userSoftSkillFinded)
      throw new AppError('This user already has this soft skill', 400);

    const userSoftSkills = new UserSoftSkills();
    Object.assign(userSoftSkills, { soft_skill_id, user_id, stars });

    return this.userSoftSkillsRepository.create(userSoftSkills);
  }
}
