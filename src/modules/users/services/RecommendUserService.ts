import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserLikeDislikeRepository from '../repositories/IUserLikeDislikeRepository';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class RecommendUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserLikeDislikeRepository')
    private userLikeDislikeRepository: IUserLikeDislikeRepository,
  ) {}

  public async execute(
    teacher_id: string,
    user_recommended_id: string,
  ): Promise<void> {
    const teacher_exists = await this.usersRepository.findById(teacher_id);

    if (!teacher_exists) {
      throw new AppError('Teacher not found');
    }

    if (teacher_exists.is_teacher === false) {
      throw new AppError('Only teachers can recommend another user');
    }

    const user_recommended_exists = await this.usersRepository.findById(
      user_recommended_id,
    );

    if (!user_recommended_exists) {
      throw new AppError('User recommended not found');
    }

    if (
      user_recommended_exists.is_teacher ||
      user_recommended_exists.is_contractor
    ) {
      throw new AppError('You can only recommend normally user');
    }

    let has_register_of_user = await this.userLikeDislikeRepository.findByUserId(
      user_recommended_id,
    );

    if (!has_register_of_user) {
      has_register_of_user = await this.userLikeDislikeRepository.create({
        user_id: user_recommended_id,
        likes: [],
        dislikes: [],
        matches: [],
        recommendations: [],
      });
    }

    has_register_of_user.recommendations.push(teacher_id);

    await this.userLikeDislikeRepository.update(has_register_of_user);
  }
}
