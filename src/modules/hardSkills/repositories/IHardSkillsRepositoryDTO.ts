import typeorm from '@seidor-cloud-produtos/typeorm';

import HardSkills from '../infra/typeorm/entities/HardSkills';

export default interface IHardSkillsRepository {
  create(hardSkillsData: HardSkills): Promise<HardSkills>;
  update(updates: HardSkills): Promise<HardSkills>;
  findById(id: string): Promise<HardSkills | undefined>;
  getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: HardSkills[]; count: number }>;
  getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<HardSkills[]>;
  remove(id: string): Promise<void>;
}
