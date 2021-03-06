import ILikeDislikeVacancyDTO from '@modules/vacancies/dtos/ILikeDislikeVacancyDTO';
import IVacancyLikeDislikeRepository from '@modules/vacancies/repositories/IVacancyLikeDislikeRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import VacancyLikeDislike from '../schemas/VacancyLikeDislike';

export default class VacancyLikeDislikeRepository
  implements IVacancyLikeDislikeRepository {
  private ormRepository: MongoRepository<VacancyLikeDislike>;

  constructor() {
    this.ormRepository = getMongoRepository(VacancyLikeDislike, 'mongo');
  }

  public async create(data: ILikeDislikeVacancyDTO): Promise<VacancyLikeDislike> {
    const data_to_create = this.ormRepository.create(data);

    await this.ormRepository.save(data_to_create);

    return data_to_create;
  }

  public async update(data: VacancyLikeDislike): Promise<VacancyLikeDislike> {
    return this.ormRepository.save(data);
  }

  public async findByVacancyId(
    vacancy_id: string,
  ): Promise<VacancyLikeDislike | undefined> {
    return this.ormRepository.findOne({
      where: {
        vacancy_id,
      },
    });
  }
}
