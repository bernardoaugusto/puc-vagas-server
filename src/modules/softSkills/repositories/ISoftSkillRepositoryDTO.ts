import { typeorm } from '@seidor-cloud-produtos/lib-seidor-common';

import SoftSkill from '../infra/typeorm/entities/SoftSkill';

export default interface ISoftSkillRepository {
  create(softSkillData: SoftSkill): Promise<SoftSkill>;
  update(updates: SoftSkill): Promise<SoftSkill>;
  findById(id: string): Promise<SoftSkill | undefined>;
  getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: SoftSkill[]; count: number }>;
  getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<SoftSkill[]>;
  remove(id: string): Promise<void>;
}
