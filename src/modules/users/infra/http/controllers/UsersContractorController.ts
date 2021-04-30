import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserContractorService from '@modules/users/services/CreateUserContractorService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import InactivateUserService from '@modules/users/services/InactivateUserService';

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

    const createUserContractorService = container.resolve(
      CreateUserContractorService,
    );

    const admin_created = await createUserContractorService.execute({
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
    const {
      name,
      email,
      phone_number,
      identifier,
      description,
      work_areas_ids,
    } = request.body;
    const { id } = request.user;

    const updateUserService = container.resolve(UpdateUserService);

    const admin_updated = await updateUserService.execute(
      {
        name,
        email,
        phone_number,
        identifier,
        description,
        work_areas_ids,
      },
      id,
    );

    return response.json(classToClass(admin_updated));
  }

  public async inactivate(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const inactivateUserService = container.resolve(InactivateUserService);

    await inactivateUserService.execute(id);

    return response.status(204).send();
  }
}
