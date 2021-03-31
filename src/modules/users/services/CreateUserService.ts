import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserSoftSkillsService from '@modules/userSoftSkills/services/CreateUserSoftSkillsService';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CreateUserSoftSkillsService')
    private createUserSoftSkillsService: CreateUserSoftSkillsService,
  ) {}

  public async execute({
    confirm_password,
    email,
    identifier,
    name,
    password,
    phone_number,
    soft_skills,
  }: ICreateUserDTO): Promise<User> {
    if (password !== confirm_password) {
      throw new AppError('The password and this confirm does not match');
    }

    const check_user_exists = await this.usersRepository.findByEmail(email);

    if (check_user_exists) {
      throw new AppError('Email address already used');
    }

    const hashed_password = await this.hashProvider.generateHash(password);

    const user = new User();
    Object.assign(user, {
      name,
      email,
      password: hashed_password,
      identifier,
      phone_number,
    });

    const createdUser = await this.usersRepository.create(user);

    if (soft_skills)
      for (const softSkill of soft_skills) {
        await this.createUserSoftSkillsService.execute({
          user_id: createdUser.id,
          soft_skill_id: softSkill.soft_skill_id,
          stars: softSkill.stars,
        });
      }

    return createdUser;
  }
}
