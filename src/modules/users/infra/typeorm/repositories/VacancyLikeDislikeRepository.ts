import ILikeDislikeVacancyDTO from '@modules/users/dtos/ILikeDislikeVacancyDTO';
import IVacancyLikeDislikeRepository from '@modules/users/repositories/IVacancyLikeDislikeRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import UserLikeDislike from '../schemas/UserLikeDislike';

export default class VacancyLikeDislikeRepository
  implements IVacancyLikeDislikeRepository {
  private ormRepository: MongoRepository<UserLikeDislike>;

  constructor() {
    this.ormRepository = getMongoRepository(UserLikeDislike, 'mongo');
  }

  public async create(data: ILikeDislikeVacancyDTO): Promise<UserLikeDislike> {
    const data_to_create = this.ormRepository.create(data);

    await this.ormRepository.save(data_to_create);

    return data_to_create;
  }

  public async update(data: UserLikeDislike): Promise<UserLikeDislike> {
    return this.ormRepository.save(data);
  }

  public async findByUserId(
    vacancy_id: string,
  ): Promise<UserLikeDislike | undefined> {
    return this.ormRepository.findOne({
      where: {
        vacancy_id,
      },
    });
  }
}
