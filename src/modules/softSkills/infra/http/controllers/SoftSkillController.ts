import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSoftSkillService from '../../../services/CreateSoftSkillService';
import GetByIdSoftSkillService from '../../../services/GetByIdSoftSkillService';
import GetAllSoftSkillService from '../../../services/GetAllSoftSkillService';
import UpdateSoftSkillService from '../../../services/UpdateSoftSkillService';
import RemoveSoftSkillService from '../../../services/RemoveSoftSkillService';

export default class SoftSkillController {
  public async create(request: Request, response: Response): Promise<Response> {
    const softSkill = request.body;

    const createSoftSkillService = container.resolve(CreateSoftSkillService);

    const softSkillCreated = await createSoftSkillService.execute(softSkill);

    return response.status(201).json(classToClass(softSkillCreated));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const softSkillId = request.params.id;

    const getByIdSoftSkillService = container.resolve(GetByIdSoftSkillService);

    const softSkill = await getByIdSoftSkillService.execute(softSkillId);

    return response.status(200).json(classToClass(softSkill));
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const query = request.query as Record<string, string>;
    const withPagination = JSON.parse(query.withPagination || 'true');

    const getAllSoftSkillService = container.resolve(GetAllSoftSkillService);
    const softSkill = await getAllSoftSkillService.execute(query, withPagination);

    return response.status(200).json(classToClass(softSkill));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updates = request.body;
    const softSkillId = request.params.id;

    const updateSoftSkillService = container.resolve(UpdateSoftSkillService);

    const softSkillUpdated = await updateSoftSkillService.execute(
      updates,
      softSkillId,
    );

    return response.status(200).json(classToClass(softSkillUpdated));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const softSkillId = request.params.id;

    const removeSoftSkillService = container.resolve(RemoveSoftSkillService);

    await removeSoftSkillService.execute(softSkillId);

    return response.status(204).json();
  }
}
