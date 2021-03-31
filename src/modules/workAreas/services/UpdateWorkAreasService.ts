import { inject, injectable } from 'tsyringe';

import WorkAreas from '../infra/typeorm/entities/WorkAreas';
import IWorkAreasUpdateDTO from '../dtos/IWorkAreasUpdateDTO';
import IWorkAreasRepositoryDTO from '../repositories/IWorkAreasRepositoryDTO';
import GetByIdWorkAreasService from './GetByIdWorkAreasService';

@injectable()
export default class UpdateWorkAreasService {
    constructor(
        @inject('WorkAreasRepository')
        private workAreasRepository: IWorkAreasRepositoryDTO,

        @inject('GetByIdWorkAreasService')
        private getByIdWorkAreasService: GetByIdWorkAreasService,
    ) {}

    public async execute(
        workAreasDataUpdates: IWorkAreasUpdateDTO,
        workAreasId: string,
    ): Promise<WorkAreas> {
        const workAreas = await this.getByIdWorkAreasService.execute(workAreasId);

        Object.assign(workAreas, workAreasDataUpdates);

        return this.workAreasRepository.update(workAreas);
    }
}
