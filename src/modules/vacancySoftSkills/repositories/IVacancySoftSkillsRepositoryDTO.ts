import typeorm from '@seidor-cloud-produtos/typeorm';

import VacancySoftSkills from '../infra/typeorm/entities/VacancySoftSkills';

export default interface IVacancySoftSkillsRepository {
  create(vacancySoftSkillsData: VacancySoftSkills): Promise<VacancySoftSkills>;
  update(updates: VacancySoftSkills): Promise<VacancySoftSkills>;
  findById(id: string): Promise<VacancySoftSkills | undefined>;
  findByVacancyIdAndSoftSkillSd(
    vacancy_id: string,
    soft_skill_id: string,
  ): Promise<VacancySoftSkills | undefined>;
  getAllWithPagination(
    options: typeorm.OptionsTypeOrmGetAllWithPagination,
  ): Promise<{ data: VacancySoftSkills[]; count: number }>;
  getAllWithoutPagination(
    options: typeorm.OptionsTypeOrmGetAllWithoutPagination,
  ): Promise<VacancySoftSkills[]>;
  remove(id: string): Promise<void>;
}
