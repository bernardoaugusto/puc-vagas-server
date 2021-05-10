import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyLikeDislikeRepository from '../repositories/IVacancyLikeDislikeRepository';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';

interface Response {
  vacancy: Vacancy;
  likes: Array<string>;
  dislikes: Array<string>;
  matches: Array<string>;
}

@injectable()
export default class GetByIdVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('VacancyLikeDislikeRepository')
    private vacancyLikeDislikeRepository: IVacancyLikeDislikeRepository,
  ) {}

  public async execute(id: string): Promise<Response> {
    const findedVacancy = await this.vacancyRepository.findById(id);

    if (!findedVacancy) throw new AppError('Vacancy not found', 404);

    const has_register_of_vacancy = await this.vacancyLikeDislikeRepository.findByVacancyId(
      id,
    );

    if (!has_register_of_vacancy) {
      return {
        vacancy: findedVacancy,
        dislikes: [],
        likes: [],
        matches: [],
      };
    }

    return {
      vacancy: findedVacancy,
      dislikes: has_register_of_vacancy.dislikes,
      likes: has_register_of_vacancy.likes,
      matches: has_register_of_vacancy.matches,
    };
  }
}
