import IUsersConnectedRepository from '@modules/chats/repositories/IUsersConnectedRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import UsersConnected from '../schemas/UsersConnected';

export default class UsersConnectedRepository implements IUsersConnectedRepository {
  private ormRepository: MongoRepository<UsersConnected>;

  constructor() {
    this.ormRepository = getMongoRepository(UsersConnected, 'mongo');
  }

  public async delete(user_id: string): Promise<void> {
    await this.ormRepository.delete({
      user_id,
    });
  }

  public async findByUserId(user_id: string): Promise<UsersConnected | undefined> {
    return this.ormRepository.findOne({
      where: {
        user_id,
      },
    });
  }

  public async create(user_id: string, client_id: string): Promise<UsersConnected> {
    const register_new_user_connected = this.ormRepository.create({
      user_id,
      client_id,
    });

    return this.ormRepository.save(register_new_user_connected);
  }

  public async save(chat_data: UsersConnected): Promise<UsersConnected> {
    return this.ormRepository.save(chat_data);
  }
}
