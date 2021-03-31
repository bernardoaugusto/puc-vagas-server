export default interface IVacancyCreateDTO {
  description: string;
  title: string;
  company_id: string;

  region?: string;
  salary_range?: string;
  soft_skills?: Array<{
    soft_skill_id: string;
    stars: number;
  }>;
  work_areas_ids?: Array<string>;
}
