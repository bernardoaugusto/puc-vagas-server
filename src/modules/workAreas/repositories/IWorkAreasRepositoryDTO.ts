import typeorm from '@seidor-cloud-produtos/typeorm';

import WorkAreas from '../infra/typeorm/entities/WorkAreas';

export default interface IWorkAreasRepository {
  create(workAreasData: WorkAreas): Promise<WorkAreas>;
  update(updates: WorkAreas): Promise<WorkAreas>;
  findById(id: string): Promise<WorkAreas | undefined>;
  getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: WorkAreas[]; count: number }>;
  getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<WorkAreas[]>;
  remove(id: string): Promise<void>;
}
