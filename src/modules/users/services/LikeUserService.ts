import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IVacancyRepositoryDTO from '@modules/vacancies/repositories/IVacancyRepositoryDTO';
import IVacancyLikeDislikeRepository from '@modules/vacancies/repositories/IVacancyLikeDislikeRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class LikeUserService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('VacancyLikeDislikeRepository')
    private vacancyLikeDislikeRepository: IVacancyLikeDislikeRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    user_id: string,
    vacancy_id: string,
    user_liked_id: string,
  ): Promise<void> {
    if (user_id === user_liked_id) {
      throw new AppError(`You can't like yourself`);
    }

    const vacancy_exists = await this.vacancyRepository.findById(vacancy_id);

    if (!vacancy_exists) {
      throw new AppError('Vacancy not found');
    }

    const check_user_liked_exists = await this.usersRepository.findById(
      user_liked_id,
    );

    if (!check_user_liked_exists) {
      throw new AppError('User not found');
    }

    let has_register_of_vacancy = await this.vacancyLikeDislikeRepository.findByVacancyId(
      vacancy_id,
    );

    if (!has_register_of_vacancy) {
      has_register_of_vacancy = await this.vacancyLikeDislikeRepository.create({
        vacancy_id,
        likes: [],
        dislikes: [],
        matches: [],
      });
    }

    if (
      has_register_of_vacancy.likes.includes(vacancy_id) ||
      has_register_of_vacancy.dislikes.includes(vacancy_id)
    ) {
      throw new AppError(`You already reacted to this user`);
    }

    has_register_of_vacancy.likes.push(check_user_liked_exists.id);

    await this.vacancyLikeDislikeRepository.update(has_register_of_vacancy);
  }
}
