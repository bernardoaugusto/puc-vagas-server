import { Repository, getRepository } from 'typeorm';
import typeorm from '@seidor-cloud-produtos/typeorm';

import WorkAreas from '../entities/WorkAreas';
import IWorkAreasRepository from '../../../repositories/IWorkAreasRepositoryDTO';

export default class WorkAreasRepository implements IWorkAreasRepository {
  private ormRepository: Repository<WorkAreas>;

  constructor() {
    this.ormRepository = getRepository(WorkAreas);
  }

  public async create(workAreasData: WorkAreas): Promise<WorkAreas> {
    const workAreas = this.ormRepository.create(workAreasData);

    return this.ormRepository.save(workAreas);
  }

  public async findById(id: string): Promise<WorkAreas | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async update(updates: WorkAreas): Promise<WorkAreas> {
    return this.ormRepository.save(updates);
  }

  public async getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: WorkAreas[]; count: number }> {
    const [data, count] = await this.ormRepository.findAndCount(options);

    return { data, count };
  }

  public async getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<WorkAreas[]> {
    return this.ormRepository.find(options);
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
