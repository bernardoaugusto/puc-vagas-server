import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number: string;
  identifier: string;
}
@injectable()
export default class CreateUserTeacherService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    password,
    phone_number,
    identifier,
    confirm_password,
  }: IRequest): Promise<User> {
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
      is_teacher: true,
      password: hashed_password,
      identifier,
      phone_number,
    });

    return this.usersRepository.create(user);
  }
}
