import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import InactivateUserService from '@modules/users/services/InactivateUserService';
import CreateCompanyEmployeeService from '@modules/users/services/CreateCompanyEmployeeService';
import LikeUserService from '@modules/users/services/LikeUserService';
import DislikeUserService from '@modules/users/services/DislikeUserService';
import GetAllUsersForVacancy from '@modules/users/services/GetAllUsersForVacancy';
import GetUserByIdService from '@modules/users/services/GetUserByIdService';
import DeleteCompanyEmployeeService from '@modules/users/services/DeleteCompanyEmployeeService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      description,
      password,
      identifier,
      confirm_password,
      phone_number,
      soft_skills,
      work_areas_ids,
    } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user_created = await createUserService.execute({
      email,
      password,
      name,
      description,
      identifier,
      confirm_password,
      phone_number,
      soft_skills,
      work_areas_ids,
    });

    return response.status(201).json(classToClass(user_created));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.user;

    const updateUserService = container.resolve(UpdateUserService);

    const user_updated = await updateUserService.execute({
      id,
      email,
      name,
    });

    return response.json(classToClass(user_updated));
  }

  public async inactivate(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const inactivateUserService = container.resolve(InactivateUserService);

    await inactivateUserService.execute(id);

    return response.status(204).send();
  }

  public async companyEmployee(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { company_id } = request.body;
    const recruiter_id = request.params.id;

    const createCompanyEmployeeService = container.resolve(
      CreateCompanyEmployeeService,
    );

    const user_updated = await createCompanyEmployeeService.execute({
      recruiter_id,
      company_id,
    });

    return response.json(classToClass(user_updated));
  }

  public async removeCompanyEmployee(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { company_id } = request.body;
    const recruiter_id = request.params.id;

    const deleteCompanyEmployeeService = container.resolve(
      DeleteCompanyEmployeeService,
    );

    const user_updated = await deleteCompanyEmployeeService.execute({
      recruiter_id,
      company_id,
    });

    return response.json(classToClass(user_updated));
  }

  public async like(request: Request, response: Response): Promise<Response> {
    const { id: user_liked_id } = request.params;
    const { id: user_id } = request.user;
    const { vacancy_id } = request.body;

    const likeUserService = container.resolve(LikeUserService);

    await likeUserService.execute(user_id, vacancy_id, user_liked_id);

    return response.status(200).json({
      vacancy_id,
      user_id,
    });
  }

  public async dislike(request: Request, response: Response): Promise<Response> {
    const { id: user_liked_id } = request.params;
    const { id: user_id } = request.user;
    const { vacancy_id } = request.body;

    const dislikeUserService = container.resolve(DislikeUserService);

    await dislikeUserService.execute(user_id, vacancy_id, user_liked_id);

    return response.status(200).json({
      vacancy_id,
      user_id,
    });
  }

  public async getUserById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUserByIdService = container.resolve(GetUserByIdService);

    const data_of_user = await getUserByIdService.execute(id);

    return response.json(data_of_user);
  }

  public async getAllUsersForLike(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.user;
    const { id: vacancy_id } = request.params;

    const getAllUsersForVacancy = container.resolve(GetAllUsersForVacancy);

    const users = await getAllUsersForVacancy.execute(id, vacancy_id);

    return response.status(200).json(users);
  }
}
