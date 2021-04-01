import Company from '@modules/companies/infra/typeorm/entities/Company';
import UserSoftSkills from '@modules/userSoftSkills/infra/typeorm/entities/UserSoftSkills';
import Vacancy from '@modules/vacancies/infra/typeorm/entities/Vacancy';
import WorkAreas from '@modules/workAreas/infra/typeorm/entities/WorkAreas';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserToken from '../infra/typeorm/entities/UserToken';
import IUserLikeDislikeRepository from '../repositories/IUserLikeDislikeRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface Response {
  id: string;

  name: string;

  password: string;

  email: string;

  identifier: string;

  phone_number: string;

  active: boolean;

  is_contractor: boolean;

  is_teacher: boolean;

  created_at: Date;

  updated_at: Date;

  user_token?: Array<UserToken>;

  companies: Company[];

  vacancies: Vacancy[];

  user_soft_skills: UserSoftSkills[];

  work_areas: WorkAreas[];

  recommendations: Array<string>;
}

@injectable()
export default class GetUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserLikeDislikeRepository')
    private userLikeDislikeRepository: IUserLikeDislikeRepository,
  ) {}

  public async execute(user_id: string): Promise<Response> {
    const user_exists = await this.usersRepository.findById(user_id);

    if (!user_exists) {
      throw new AppError('User not found');
    }

    const has_recommentadions_for_this_user = await this.userLikeDislikeRepository.findByUserId(
      user_id,
    );

    return {
      ...user_exists,
      recommendations: has_recommentadions_for_this_user
        ? has_recommentadions_for_this_user.recommendations
        : [],
    };
  }
}
