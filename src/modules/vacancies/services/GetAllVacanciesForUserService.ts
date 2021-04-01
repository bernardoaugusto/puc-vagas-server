import IUserLikeDislikeRepository from '@modules/users/repositories/IUserLikeDislikeRepository';
import { inject, injectable } from 'tsyringe';

import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';

@injectable()
export default class GetAllVacanciesForUserService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('UserLikeDislikeRepository')
    private userLikeDislikeRepository: IUserLikeDislikeRepository,
  ) {}

  public async execute(user_id: string): Promise<Array<Vacancy>> {
    let excluded_ids: Array<string> = [];

    const has_register_of_like_and_dislike = await this.userLikeDislikeRepository.findByUserId(
      user_id,
    );

    if (has_register_of_like_and_dislike) {
      excluded_ids = has_register_of_like_and_dislike.likes.concat(
        has_register_of_like_and_dislike.dislikes,
      );
    }

    return this.vacancyRepository.getAllVacanciesForUser(excluded_ids);
  }
}
