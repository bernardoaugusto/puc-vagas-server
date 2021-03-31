import ICreateChatDTO from '../dtos/ICreateChatDTO';
import Chat from '../infra/typeorm/schemas/Chat';

export default interface IChatRepository {
  findByUserId(user_id: string): Promise<Chat | undefined>;
  create(chat_data: ICreateChatDTO): Promise<Chat>;
  save(chat_data: Chat): Promise<Chat>;
}
