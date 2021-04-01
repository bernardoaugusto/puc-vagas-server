import UsersConnected from '../infra/typeorm/schemas/UsersConnected';

export default interface IUsersConnectedRepository {
  findByUserId(user_id: string): Promise<UsersConnected | undefined>;
  create(user_id: string, client_id: string): Promise<UsersConnected>;
  save(chat_data: UsersConnected): Promise<UsersConnected>;
  delete(user_id: string): Promise<void>;
}
