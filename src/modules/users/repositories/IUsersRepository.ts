import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: User): Promise<User>;
  save(user: User): Promise<User>;
  getAllUsersForLikeOrDislike(excluded_ids: Array<string>): Promise<Array<User>>;
}
