import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class InactivateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const finded_user = await this.userRepository.findById(id);

    if (!finded_user) {
      throw new AppError('User not found');
    }

    finded_user.active = false;

    await this.userRepository.save(finded_user);
  }
}
