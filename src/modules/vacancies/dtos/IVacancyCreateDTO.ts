export default interface IVacancyCreateDTO {
  description: string;
  title: string;
  company_id: string;
  hard_skills: Array<{ 
    description: string; 
    stars: number; 
    priority: number; 
  }>;
  region?: string;
  start_salary_range?: string;
  end_salary_range?: string;
  soft_skills?: Array<{
    soft_skill_id: string;
    stars: number;
    priority: number;
  }>;
  work_areas_ids?: Array<string>;
  end_date?: string;
}
