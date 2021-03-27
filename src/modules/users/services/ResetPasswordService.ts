import { injectable, inject } from 'tsyringe';
import { differenceInMinutes } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
  email: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token, email }: IRequest): Promise<void> {
    const user_exists = await this.usersRepository.findByEmail(email);

    if (!user_exists) {
      throw new AppError('The email has not registered!');
    }

    const user_token = await this.usersTokenRepository.findByToken(
      token,
      user_exists.id,
    );

    if (!user_token || !user_token.active) {
      throw new AppError('The token not exists!');
    }

    const user = await this.usersRepository.findById(user_exists.id);

    if (!user) {
      throw new AppError('User token does not exists');
    }

    if (differenceInMinutes(user_token.created_at, new Date(Date.now())) > 15) {
      await this.usersTokenRepository.save(user_token);
      throw new AppError('Token Expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

    user_token.active = false;
    await this.usersTokenRepository.save(user_token);
  }
}
