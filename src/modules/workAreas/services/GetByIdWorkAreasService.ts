import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';

import WorkAreas from '../infra/typeorm/entities/WorkAreas';
import IWorkAreasRepositoryDTO from '../repositories/IWorkAreasRepositoryDTO';

@injectable()
export default class GetByIdWorkAreasService {
  constructor(
    @inject('WorkAreasRepository')
    private workAreasRepository: IWorkAreasRepositoryDTO,
  ) {}

  public async execute(id: string): Promise<WorkAreas> {
    const findedWorkAreas = await this.workAreasRepository.findById(id);

    if (!findedWorkAreas) throw new AppError('WorkAreas not found', 404);

    return findedWorkAreas;
  }
}
