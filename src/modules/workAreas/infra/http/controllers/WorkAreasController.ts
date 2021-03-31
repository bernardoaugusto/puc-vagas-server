import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateWorkAreasService from '../../../services/CreateWorkAreasService';
import GetByIdWorkAreasService from '../../../services/GetByIdWorkAreasService';
import GetAllWorkAreasService from '../../../services/GetAllWorkAreasService';
import UpdateWorkAreasService from '../../../services/UpdateWorkAreasService';
import RemoveWorkAreasService from '../../../services/RemoveWorkAreasService';

export default class WorkAreasController {
    public async create(request: Request, response: Response): Promise<Response> {
        const workAreas = request.body;

        const createWorkAreasService = container.resolve(CreateWorkAreasService);

        const workAreasCreated = await createWorkAreasService.execute(workAreas);

        return response.status(201).json(classToClass(workAreasCreated));
    }

    public async getById(request: Request, response: Response): Promise<Response> {
        const workAreasId = request.params.id;

        const getByIdWorkAreasService = container.resolve(GetByIdWorkAreasService);

        const workAreas = await getByIdWorkAreasService.execute(workAreasId);

        return response.status(200).json(classToClass(workAreas));
    }

    public async getAll(request: Request, response: Response): Promise<Response> {
        const query = request.query as Record<string, string>;
        const withPagination = JSON.parse(query.withPagination || 'true');

        const getAllWorkAreasService = container.resolve(GetAllWorkAreasService);
        const workAreas = await getAllWorkAreasService.execute(query, withPagination);

        return response.status(200).json(classToClass(workAreas));
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const updates = request.body;
        const workAreasId = request.params.id;

        const updateWorkAreasService = container.resolve(UpdateWorkAreasService);

        const workAreasUpdated = await updateWorkAreasService.execute(updates, workAreasId);

        return response.status(200).json(classToClass(workAreasUpdated));
    }

    public async remove(request: Request, response: Response): Promise<Response> {
        const workAreasId = request.params.id;

        const removeWorkAreasService = container.resolve(RemoveWorkAreasService);

        await removeWorkAreasService.execute(workAreasId);

        return response.status(204).json();
    }
}
