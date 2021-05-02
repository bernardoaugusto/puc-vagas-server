import IVacancyLikeDislikeRepository from '@modules/vacancies/repositories/IVacancyLikeDislikeRepository';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class GetAllUsersForVacancy {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('VacancyLikeDislikeRepository')
    private vacancyLikeDislikeRepository: IVacancyLikeDislikeRepository,
  ) {}

  public async execute(user_id: string, vacancy_id: string): Promise<Array<User>> {
    let excluded_ids: Array<string> = [];

    const has_register_of_like_and_dislike = await this.vacancyLikeDislikeRepository.findByVacancyId(
      vacancy_id,
    );

    if (has_register_of_like_and_dislike) {
      excluded_ids = has_register_of_like_and_dislike.likes.concat(
        has_register_of_like_and_dislike.dislikes,
      );
    }

    return this.usersRepository.getAllUsersForLikeOrDislike(excluded_ids);
  }
}
