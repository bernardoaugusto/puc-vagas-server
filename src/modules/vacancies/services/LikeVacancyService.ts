import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IVacancyLikeDislikeRepository from '@modules/users/repositories/IVacancyLikeDislikeRepository';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';

@injectable()
export default class LikeVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('VacancyLikeDislikeRepository')
    private vacancyLikeDislikeRepository: IVacancyLikeDislikeRepository,
  ) {}

  public async execute(user_id: string, vacancy_id: string): Promise<void> {
    const vacancy_exists = await this.vacancyRepository.findById(vacancy_id);

    if (!vacancy_exists) {
      throw new AppError('Vacancy not found');
    }

    let has_register_of_user = await this.vacancyLikeDislikeRepository.findByUserId(
      user_id,
    );

    if (!has_register_of_user) {
      has_register_of_user = await this.vacancyLikeDislikeRepository.create({
        user_id,
        likes: [vacancy_exists.id],
        dislikes: [],
      });
    }

    has_register_of_user.likes.push(vacancy_exists.id);

    await this.vacancyLikeDislikeRepository.update(has_register_of_user);
  }
}
