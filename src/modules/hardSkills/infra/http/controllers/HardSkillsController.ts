import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateHardSkillsService from '../../../services/CreateHardSkillsService';
import GetByIdHardSkillsService from '../../../services/GetByIdHardSkillsService';
import GetAllHardSkillsService from '../../../services/GetAllHardSkillsService';
import UpdateHardSkillsService from '../../../services/UpdateHardSkillsService';
import RemoveHardSkillsService from '../../../services/RemoveHardSkillsService';

export default class HardSkillsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const hardSkills = request.body;

    const createHardSkillsService = container.resolve(CreateHardSkillsService);

    const hardSkillsCreated = await createHardSkillsService.execute(hardSkills);

    return response.status(201).json(classToClass(hardSkillsCreated));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const hardSkillsId = request.params.id;

    const getByIdHardSkillsService = container.resolve(GetByIdHardSkillsService);

    const hardSkills = await getByIdHardSkillsService.execute(hardSkillsId);

    return response.status(200).json(classToClass(hardSkills));
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const query = request.query as Record<string, string>;
    const withPagination = JSON.parse(query.withPagination || 'true');

    const getAllHardSkillsService = container.resolve(GetAllHardSkillsService);
    const hardSkills = await getAllHardSkillsService.execute(query, withPagination);

    return response.status(200).json(classToClass(hardSkills));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updates = request.body;
    const hardSkillsId = request.params.id;

    const updateHardSkillsService = container.resolve(UpdateHardSkillsService);

    const hardSkillsUpdated = await updateHardSkillsService.execute(
      updates,
      hardSkillsId,
    );

    return response.status(200).json(classToClass(hardSkillsUpdated));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const hardSkillsId = request.params.id;

    const removeHardSkillsService = container.resolve(RemoveHardSkillsService);

    await removeHardSkillsService.execute(hardSkillsId);

    return response.status(204).json();
  }
}
