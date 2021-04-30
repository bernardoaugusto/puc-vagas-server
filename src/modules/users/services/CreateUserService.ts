import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserSoftSkillsService from '@modules/userSoftSkills/services/CreateUserSoftSkillsService';
import GetByIdWorkAreasService from '@modules/workAreas/services/GetByIdWorkAreasService';
import WorkAreas from '@modules/workAreas/infra/typeorm/entities/WorkAreas';
import IUserSoftSkillsCreateDTO from '@modules/userSoftSkills/dtos/IUserSoftSkillsCreateDTO';
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

    @inject('GetByIdWorkAreasService')
    private getByIdWorkAreasService: GetByIdWorkAreasService,
  ) {}

  public async execute({
    confirm_password,
    email,
    description,
    identifier,
    name,
    password,
    phone_number,
    soft_skills,
    work_areas_ids,
  }: ICreateUserDTO): Promise<User> {
    if (password !== confirm_password)
      throw new AppError('The password and this confirm does not match');

    const check_user_exists = await this.usersRepository.findByEmail(email);

    if (check_user_exists) throw new AppError('Email address already used');

    const hashed_password = await this.hashProvider.generateHash(password);

    const user = new User();
    Object.assign(user, {
      name,
      description,
      email,
      password: hashed_password,
      identifier,
      phone_number,
    });

    if (work_areas_ids) {
      const getWorkAreas: Array<WorkAreas> = [];
      for (const idWorkAreas of work_areas_ids) {
        getWorkAreas.push(await this.getByIdWorkAreasService.execute(idWorkAreas));
      }

      if (getWorkAreas.length !== work_areas_ids.length)
        throw new AppError('There are unregistered work areas');

      user.work_areas = getWorkAreas;
    }

    const createdUser = await this.usersRepository.create(user);

    if (soft_skills) {
      const createSoftSkills: Array<IUserSoftSkillsCreateDTO> = [];

      for (const softSkill of soft_skills) {
        createSoftSkills.push({
          user_id: createdUser.id,
          soft_skill_id: softSkill.soft_skill_id,
          stars: softSkill.stars,
        });
      }

      await this.createUserSoftSkillsService.execute(createSoftSkills);
    }

    return createdUser;
  }
}
