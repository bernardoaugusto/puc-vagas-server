import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserSoftSkillsService from '../../../services/CreateUserSoftSkillsService';
import GetByIdUserSoftSkillsService from '../../../services/GetByIdUserSoftSkillsService';
import GetAllUserSoftSkillsService from '../../../services/GetAllUserSoftSkillsService';
import UpdateUserSoftSkillsService from '../../../services/UpdateUserSoftSkillsService';
import RemoveUserSoftSkillsService from '../../../services/RemoveUserSoftSkillsService';

export default class UserSoftSkillsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userSoftSkills = request.body.user_soft_skills;

    const createUserSoftSkillsService = container.resolve(
      CreateUserSoftSkillsService,
    );

    const userSoftSkillsCreated = await createUserSoftSkillsService.execute(
      userSoftSkills,
    );

    return response.status(201).json(classToClass(userSoftSkillsCreated));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const userSoftSkillsId = request.params.id;

    const getByIdUserSoftSkillsService = container.resolve(
      GetByIdUserSoftSkillsService,
    );

    const userSoftSkills = await getByIdUserSoftSkillsService.execute(
      userSoftSkillsId,
    );

    return response.status(200).json(classToClass(userSoftSkills));
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const query = request.query as Record<string, string>;
    const withPagination = JSON.parse(query.withPagination || 'true');

    const getAllUserSoftSkillsService = container.resolve(
      GetAllUserSoftSkillsService,
    );
    const userSoftSkills = await getAllUserSoftSkillsService.execute(
      query,
      withPagination,
    );

    return response.status(200).json(classToClass(userSoftSkills));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updates = request.body;
    const userSoftSkillsId = request.params.id;

    const updateUserSoftSkillsService = container.resolve(
      UpdateUserSoftSkillsService,
    );

    const userSoftSkillsUpdated = await updateUserSoftSkillsService.execute(
      updates,
      userSoftSkillsId,
    );

    return response.status(200).json(classToClass(userSoftSkillsUpdated));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const userSoftSkillsId = request.params.id;

    const removeUserSoftSkillsService = container.resolve(
      RemoveUserSoftSkillsService,
    );

    await removeUserSoftSkillsService.execute(userSoftSkillsId);

    return response.status(204).json();
  }
}
