import ICreateChatDTO from '@modules/chats/dtos/ICreateChatDTO';
import IChatRepository from '@modules/chats/repositories/IChatRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Chat from '../schemas/Chat';

export default class ChatRepository implements IChatRepository {
  private ormConfig: MongoRepository<Chat>;

  constructor() {
    this.ormConfig = getMongoRepository(Chat, 'mongo');
  }

  public async findByUserId(user_id: string): Promise<Chat | undefined> {
    return this.ormConfig.findOne({
      where: {
        user_id,
      },
    });
  }

  public async create(chat_data: ICreateChatDTO): Promise<Chat> {
    const chat_data_created = this.ormConfig.create(chat_data);

    return this.ormConfig.save(chat_data_created);
  }

  public async save(chat_data: Chat): Promise<Chat> {
    return this.ormConfig.save(chat_data);
  }
}
