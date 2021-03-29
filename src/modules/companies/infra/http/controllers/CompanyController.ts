import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyService from '../../../services/CreateCompanyService';
import GetByIdCompanyService from '../../../services/GetByIdCompanyService';
import GetAllCompanyService from '../../../services/GetAllCompanyService';
import UpdateCompanyService from '../../../services/UpdateCompanyService';
import RemoveCompanyService from '../../../services/RemoveCompanyService';

export default class CompanyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const company = request.body;

    const createCompanyService = container.resolve(CreateCompanyService);

    const companyCreated = await createCompanyService.execute(company);

    return response.status(201).json(classToClass(companyCreated));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const companyId = request.params.id;

    const getByIdCompanyService = container.resolve(GetByIdCompanyService);

    const company = await getByIdCompanyService.execute(companyId);

    return response.status(200).json(classToClass(company));
  }

  public async getAll(request: Request, response: Response): Promise<Response> {
    const query = request.query as Record<string, string>;
    const withPagination = JSON.parse(query.withPagination || 'true');

    const getAllCompanyService = container.resolve(GetAllCompanyService);
    const company = await getAllCompanyService.execute(query, withPagination);

    return response.status(200).json(classToClass(company));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updates = request.body;
    const companyId = request.params.id;

    const updateCompanyService = container.resolve(UpdateCompanyService);

    const companyUpdated = await updateCompanyService.execute(updates, companyId);

    return response.status(200).json(classToClass(companyUpdated));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const companyId = request.params.id;

    const removeCompanyService = container.resolve(RemoveCompanyService);

    await removeCompanyService.execute(companyId);

    return response.status(204).json();
  }
}
