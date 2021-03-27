import { getRepository, Repository } from 'typeorm';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserToken from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async save(user_token: UserToken): Promise<UserToken> {
    return this.ormRepository.save(user_token);
  }

  public async generate(user_id: string, token: string): Promise<UserToken> {
    const user_token_generated = this.ormRepository.create({
      user_id,
      token,
    });

    await this.ormRepository.save(user_token_generated);

    return user_token_generated;
  }

  public async findByToken(
    token: string,
    user_id: string,
  ): Promise<UserToken | undefined> {
    return this.ormRepository.findOne({
      where: {
        token,
        user_id,
        active: true,
      },
    });
  }
}

export default UsersTokensRepository;
