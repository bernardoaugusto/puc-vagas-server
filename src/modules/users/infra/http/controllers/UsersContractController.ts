import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserContractService from '@modules/users/services/CreateUserContractService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import InactivateUserService from '@modules/users/services/InactivateUserService';

export default class UsersAdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      confirmPassword,
      identifier,
      phone_number,
    } = request.body;

    const createUserContractService = container.resolve(CreateUserContractService);

    const admin_created = await createUserContractService.execute({
      email,
      password,
      name,
      confirmPassword,
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
}