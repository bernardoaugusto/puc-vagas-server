import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ChatsWithAnotherUser } from '../infra/typeorm/schemas/Chat';
import IChatRepository from '../repositories/IChatRepository';

@injectable()
export default class FindChatService {
  constructor(
    @inject('ChatRepository')
    private chatRepository: IChatRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<Array<ChatsWithAnotherUser>> {
    const has_user = await this.usersRepository.findById(user_id);

    if (!has_user) {
      throw new AppError('Usuário não encontrado');
    }

    const chatOfHisUser = await this.chatRepository.findChat(user_id);

    if (!chatOfHisUser) {
      return [];
    }

    return chatOfHisUser.chats;
  }
}
