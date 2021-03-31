import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateVacancySoftSkillsService from '../../../services/CreateVacancySoftSkillsService';
import GetByIdVacancySoftSkillsService from '../../../services/GetByIdVacancySoftSkillsService';
import GetAllVacancySoftSkillsService from '../../../services/GetAllVacancySoftSkillsService';
import UpdateVacancySoftSkillsService from '../../../services/UpdateVacancySoftSkillsService';
import RemoveVacancySoftSkillsService from '../../../services/RemoveVacancySoftSkillsService';

export default class VacancySoftSkillsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const vacancySoftSkills = request.body;

    const createVacancySoftSkillsService = container.resolve(
      CreateVacancySoftSkillsService,
    );

    const vacancySoftSkillsCreated = await createVacancySoftSkillsService.execute(
      vacancySoftSkills,
    );

    return response.status(201).json(classToClass(vacancySoftSkillsCreated));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const vacancySoftSkillsId = request.params.id;

    const getByIdVacancySoftSkillsService = container.resolve(
      GetByIdVacancySoftSkillsService,
    );

    const vacancySoftSkills = await getByIdVacancySoftSkillsService.execute(
      vacancySoftSkillsId,
    );

    return response.status(200).json(classToClass(vacancySoftSkills));
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const query = request.query as Record<string, string>;
    const withPagination = JSON.parse(query.withPagination || 'true');

    const getAllVacancySoftSkillsService = container.resolve(
      GetAllVacancySoftSkillsService,
    );
    const vacancySoftSkills = await getAllVacancySoftSkillsService.execute(
      query,
      withPagination,
    );

    return response.status(200).json(classToClass(vacancySoftSkills));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updates = request.body;
    const vacancySoftSkillsId = request.params.id;

    const updateVacancySoftSkillsService = container.resolve(
      UpdateVacancySoftSkillsService,
    );

    const vacancySoftSkillsUpdated = await updateVacancySoftSkillsService.execute(
      updates,
      vacancySoftSkillsId,
    );

    return response.status(200).json(classToClass(vacancySoftSkillsUpdated));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const vacancySoftSkillsId = request.params.id;

    const removeVacancySoftSkillsService = container.resolve(
      RemoveVacancySoftSkillsService,
    );

    await removeVacancySoftSkillsService.execute(vacancySoftSkillsId);

    return response.status(204).json();
  }
}
