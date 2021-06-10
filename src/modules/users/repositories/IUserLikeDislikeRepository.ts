import ILikeDislikeVacancyDTO from '../dtos/ILikeDislikeVacancyDTO';
import UserLikeDislike from '../infra/typeorm/schemas/UserLikeDislike';

export default interface IUserLikeDislikeRepository {
  create(data: ILikeDislikeVacancyDTO): Promise<UserLikeDislike>;
  update(data: UserLikeDislike): Promise<UserLikeDislike>;
  findByUserId(user_id: string): Promise<UserLikeDislike | undefined>;
  getAll(): Promise<Array<UserLikeDislike> | undefined>;
}
