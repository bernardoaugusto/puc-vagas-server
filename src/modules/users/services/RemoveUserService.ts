/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserSoftSkillsRepositoryDTO from '@modules/userSoftSkills/repositories/IUserSoftSkillsRepositoryDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class RemoveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserSoftSkillsRepository')
    private userSoftSkillsRepository: IUserSoftSkillsRepositoryDTO,
  ) {}

  public async execute(vacancyId: string): Promise<void> {
    const user = await this.usersRepository.findById(vacancyId);

    if (!user) throw new AppError('User not found');

    user.work_areas = [];

    await this.usersRepository.save(user);

    const userSoftSkills = await this.userSoftSkillsRepository.getAllWithoutPagination(
      <any>{ where: { vacancy_id: vacancyId } },
    );

    for (const userSoftSkill of userSoftSkills) {
      await this.userSoftSkillsRepository.remove(userSoftSkill.id);
    }

    await this.usersRepository.remove(vacancyId);
  }
}
