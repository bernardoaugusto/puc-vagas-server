<<<<<<< HEAD
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserLikeDislikeRepository from '@modules/users/repositories/IUserLikeDislikeRepository';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';

@injectable()
export default class LikeVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('UserLikeDislikeRepository')
    private userLikeDislikeRepository: IUserLikeDislikeRepository,
  ) {}

  public async execute(user_id: string, vacancy_id: string): Promise<void> {
    const vacancy_exists = await this.vacancyRepository.findById(vacancy_id);

    if (!vacancy_exists) {
      throw new AppError('Vacancy not found');
    }

    let has_register_of_user = await this.userLikeDislikeRepository.findByUserId(
      user_id,
    );

    if (!has_register_of_user) {
      has_register_of_user = await this.userLikeDislikeRepository.create({
        user_id,
        likes: [],
        dislikes: [],
        matches: [],
      });
    }

    if (
      has_register_of_user.likes.includes(vacancy_id) ||
      has_register_of_user.dislikes.includes(vacancy_id)
    ) {
      throw new AppError(`You already reacted to this vacancy`);
    }

    has_register_of_user.likes.push(vacancy_exists.id);

    await this.userLikeDislikeRepository.update(has_register_of_user);
  }
}
=======
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserLikeDislikeRepository from '@modules/users/repositories/IUserLikeDislikeRepository';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';
import IVacancyLikeDislikeRepository from '../repositories/IVacancyLikeDislikeRepository';

@injectable()
export default class LikeVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('UserLikeDislikeRepository')
    private userLikeDislikeRepository: IUserLikeDislikeRepository,

    @inject('VacancyLikeDislikeRepository')
    private vacancyLikeDislikeRepository: IVacancyLikeDislikeRepository,
  ) {}

  public async execute(user_id: string, vacancy_id: string): Promise<void> {
    const vacancy_exists = await this.vacancyRepository.findById(vacancy_id);

    if (!vacancy_exists) {
      throw new AppError('Vacancy not found');
    }

    let has_register_of_user = await this.userLikeDislikeRepository.findByUserId(
      user_id,
    );

    if (!has_register_of_user) {
      has_register_of_user = await this.userLikeDislikeRepository.create({
        user_id,
        likes: [],
        dislikes: [],
        matches: [],
      });
    }

    if (
      has_register_of_user.likes.includes(vacancy_id) ||
      has_register_of_user.dislikes.includes(vacancy_id)
    ) {
      throw new AppError(`You already reacted to this vacancy`);
    }

    const has_register_of_vacancy = await this.vacancyLikeDislikeRepository.findByVacancyId(
      vacancy_id,
    );

    if (has_register_of_vacancy) {
      const has_match = has_register_of_vacancy.likes.includes(vacancy_id);

      if (has_match) {
        // eslint-disable-next-line no-console
        console.log('match');

        has_register_of_vacancy.matches.push(user_id);

        has_register_of_user.matches.push(vacancy_exists.id);

        await this.vacancyLikeDislikeRepository.update(has_register_of_vacancy);
      }
    }

    has_register_of_user.likes.push(vacancy_exists.id);

    await this.userLikeDislikeRepository.update(has_register_of_user);
  }
}
>>>>>>> feature/implements-like-dislike-vacancy
