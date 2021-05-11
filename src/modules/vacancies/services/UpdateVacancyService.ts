import { inject, injectable } from 'tsyringe';

import WorkAreas from '@modules/workAreas/infra/typeorm/entities/WorkAreas';
import GetByIdWorkAreasService from '@modules/workAreas/services/GetByIdWorkAreasService';
import AppError from '@shared/errors/AppError';
import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyUpdateDTO from '../dtos/IVacancyUpdateDTO';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';
import GetByIdVacancyService from './GetByIdVacancyService';

@injectable()
export default class UpdateVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('GetByIdVacancyService')
    private getByIdVacancyService: GetByIdVacancyService,

    @inject('GetByIdWorkAreasService')
    private getByIdWorkAreasService: GetByIdWorkAreasService,
  ) {}

  public async execute(
    vacancyDataUpdates: IVacancyUpdateDTO,
    vacancyId: string,
  ): Promise<Vacancy> {
    const updates = vacancyDataUpdates;
    const workAreasIds = updates.work_areas_ids;
    updates.work_areas_ids = [];

    const data = await this.getByIdVacancyService.execute(vacancyId);

    Object.assign(data.vacancy, updates);

    if (workAreasIds) {
      const getWorkAreas: Array<WorkAreas> = [];
      for (const idWorkAreas of workAreasIds) {
        getWorkAreas.push(await this.getByIdWorkAreasService.execute(idWorkAreas));
      }

      if (getWorkAreas.length !== workAreasIds.length)
        throw new AppError('There are unregistered work areas');

      data.vacancy.work_areas = getWorkAreas;
    } else data.vacancy.work_areas = [];

    return this.vacancyRepository.update(data.vacancy);
  }
}
