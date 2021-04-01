import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserTeacherService from '@modules/users/services/CreateUserTeacherService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import InactivateUserService from '@modules/users/services/InactivateUserService';
import RecommendUserService from '@modules/users/services/RecommendUserService';

export default class UsersAdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      confirm_password,
      identifier,
      phone_number,
    } = request.body;

    const createUserTeacherService = container.resolve(CreateUserTeacherService);

    const admin_created = await createUserTeacherService.execute({
      email,
      password,
      name,
      confirm_password,
      identifier,
      phone_number,
    });

    return response.status(201).json(classToClass(admin_created));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.user;

    const updateUserService = container.resolve(UpdateUserService);

    const admin_updated = await updateUserService.execute({
      id,
      email,
      name,
    });

    return response.json(classToClass(admin_updated));
  }

  public async inactivate(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const inactivateUserService = container.resolve(InactivateUserService);

    await inactivateUserService.execute(id);

    return response.status(204).send();
  }

  public async recommend(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: teacher_id } = request.user;

    const recommendUserService = container.resolve(RecommendUserService);

    await recommendUserService.execute(teacher_id, id);

    return response.status(204).send();
  }
}
