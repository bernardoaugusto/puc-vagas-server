import ILikeDislikeVacancyDTO from '@modules/users/dtos/ILikeDislikeVacancyDTO';
import IUserLikeDislikeRepository from '@modules/users/repositories/IUserLikeDislikeRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import UserLikeDislike from '../schemas/UserLikeDislike';

export default class UserLikeDislikeRepository
  implements IUserLikeDislikeRepository
{
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

  public async getAll(): Promise<Array<UserLikeDislike> | undefined> {
    return this.ormRepository.find();
  }

  public async findByUserId(user_id: string): Promise<UserLikeDislike | undefined> {
    return this.ormRepository.findOne({
      where: {
        user_id,
      },
    });
  }
}
