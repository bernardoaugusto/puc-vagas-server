import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import LikeVacancyService from '@modules/vacancies/services/LikeVacancyService';
import CreateVacancyService from '../../../services/CreateVacancyService';
import GetByIdVacancyService from '../../../services/GetByIdVacancyService';
import GetAllVacancyService from '../../../services/GetAllVacancyService';
import UpdateVacancyService from '../../../services/UpdateVacancyService';
import RemoveVacancyService from '../../../services/RemoveVacancyService';

export default class VacancyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const vacancy = request.body;
    const { user } = request;

    const createVacancyService = container.resolve(CreateVacancyService);

    const vacancyCreated = await createVacancyService.execute(vacancy, user);

    return response.status(201).json(classToClass(vacancyCreated));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const vacancyId = request.params.id;

    const getByIdVacancyService = container.resolve(GetByIdVacancyService);

    const vacancy = await getByIdVacancyService.execute(vacancyId);

    return response.status(200).json(classToClass(vacancy));
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const query = request.query as Record<string, string>;
    const withPagination = JSON.parse(query.withPagination || 'true');

    const getAllVacancyService = container.resolve(GetAllVacancyService);
    const vacancy = await getAllVacancyService.execute(query, withPagination);

    return response.status(200).json(classToClass(vacancy));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updates = request.body;
    const vacancyId = request.params.id;

    const updateVacancyService = container.resolve(UpdateVacancyService);

    const vacancyUpdated = await updateVacancyService.execute(updates, vacancyId);

    return response.status(200).json(classToClass(vacancyUpdated));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const vacancyId = request.params.id;

    const removeVacancyService = container.resolve(RemoveVacancyService);

    await removeVacancyService.execute(vacancyId);

    return response.status(204).json();
  }

  public async like(request: Request, response: Response): Promise<Response> {
    const { id: vacancy_id } = request.params;
    const { id: user_id } = request.user;

    const likeVacancyService = container.resolve(LikeVacancyService);

    await likeVacancyService.execute(user_id, vacancy_id);

    return response.status(200).json({
      vacancy_id,
      user_id,
    });
  }
}
