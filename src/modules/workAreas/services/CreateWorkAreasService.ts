import { inject, injectable } from 'tsyringe';

import WorkAreas from '../infra/typeorm/entities/WorkAreas';
import IWorkAreasCreateDTO from '../dtos/IWorkAreasCreateDTO';
import IWorkAreasRepositoryDTO from '../repositories/IWorkAreasRepositoryDTO';

@injectable()
export default class CreateWorkAreasService {
    constructor(
        @inject('WorkAreasRepository')
        private workAreasRepository: IWorkAreasRepositoryDTO,
    ) {}

    public async execute(workAreasData: IWorkAreasCreateDTO): Promise<WorkAreas> {
        const workAreas = new WorkAreas();
        Object.assign(workAreas, workAreasData);

        return this.workAreasRepository.create(workAreas);
    }
}
