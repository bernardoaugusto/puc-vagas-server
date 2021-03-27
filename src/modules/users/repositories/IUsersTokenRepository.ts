import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokenRepository {
  generate(user_id: string, token: string): Promise<UserToken>;
  save(user_token: UserToken): Promise<UserToken>;
  findByToken(token: string, user_id: string): Promise<UserToken | undefined>;
}
