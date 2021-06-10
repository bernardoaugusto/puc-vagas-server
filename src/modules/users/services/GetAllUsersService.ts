import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserLikeDislikeRepository from '../repositories/IUserLikeDislikeRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class GetAllUsers {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserLikeDislikeRepository')
    private userLikeDislikeRepository: IUserLikeDislikeRepository,
  ) {}

  public async execute(): Promise<Array<User>> {
    let excluded_ids: Array<string> = [];

    const allUsers = await this.usersRepository.getAllUsersForLikeOrDislike(excluded_ids);

    const extra_info_for_users = await this.userLikeDislikeRepository.getAll();

    const complete_users_array = allUsers.map(user => {
      const exist_extra_user_info = extra_info_for_users?.find(extraUserInfo => extraUserInfo.user_id === user.id);
      if(exist_extra_user_info){
        const { dislikes, matches, likes, recommendations } = exist_extra_user_info
        return {
          ...user,
          dislikes,
          matches,
          likes,
          recommendations,
        }
      } else {
        return {
          ...user,
          recommendations: [],
          dislikes: [],
          likes: [],
          matches: [],
        }
      }
    })

    return complete_users_array;
  }
}
