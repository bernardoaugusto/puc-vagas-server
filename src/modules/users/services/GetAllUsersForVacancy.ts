import IVacancyLikeDislikeRepository from '@modules/vacancies/repositories/IVacancyLikeDislikeRepository';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserLikeDislikeRepository from '../repositories/IUserLikeDislikeRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class GetAllUsersForVacancy {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('VacancyLikeDislikeRepository')
    private vacancyLikeDislikeRepository: IVacancyLikeDislikeRepository,

    @inject('UserLikeDislikeRepository')
    private userLikeDislikeRepository: IUserLikeDislikeRepository,
  ) {}

  public async execute(user_id: string, vacancy_id: string): Promise<Array<User>> {
    let excluded_ids: Array<string> = [user_id];

    const has_register_of_like_and_dislike = await this.vacancyLikeDislikeRepository.findByVacancyId(
      vacancy_id,
    );

    if (has_register_of_like_and_dislike) {
      excluded_ids = has_register_of_like_and_dislike.likes.concat(
        has_register_of_like_and_dislike.dislikes,
      );
    }

    excluded_ids.push(user_id);

    const users = await this.usersRepository.getAllUsersForLikeOrDislike(excluded_ids);

    const extra_info_for_users = await this.userLikeDislikeRepository.getAll();

    const complete_users_array = users.map(user => {
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
