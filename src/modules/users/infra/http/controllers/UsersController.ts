import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import InactivateUserService from '@modules/users/services/InactivateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      identifier,
      confirm_password,
      phone_number,
    } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user_created = await createUserService.execute({
      email,
      password,
      name,
      identifier,
      confirm_password,
      phone_number,
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
}
