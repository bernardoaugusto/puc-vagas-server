import { inject, injectable } from 'tsyringe';

import IWorkAreasRepositoryDTO from '../repositories/IWorkAreasRepositoryDTO';
import GetByIdWorkAreasService from './GetByIdWorkAreasService';

@injectable()
export default class RemoveWorkAreasService {
  constructor(
    @inject('WorkAreasRepository')
    private workAreasRepository: IWorkAreasRepositoryDTO,

    @inject('GetByIdWorkAreasService')
    private getByIdWorkAreasService: GetByIdWorkAreasService,
  ) {}

  public async execute(workAreasId: string): Promise<void> {
    await this.getByIdWorkAreasService.execute(workAreasId);

    await this.workAreasRepository.remove(workAreasId);
  }
}
