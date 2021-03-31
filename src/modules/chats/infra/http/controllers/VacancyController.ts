import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ChatController {
  public async create(request: Request, response: Response): Promise<Response> {
    const vacancy = request.body;
    const { user } = request;

    const createVacancyService = container.resolve(CreateVacancyService);

    const vacancyCreated = await createVacancyService.execute(vacancy, user);

    return response.status(201).json(classToClass(vacancyCreated));
  }
}
