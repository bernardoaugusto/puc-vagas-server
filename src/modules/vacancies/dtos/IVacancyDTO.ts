export default interface IVacancyDTO {
  id: string;
  description: string;
  title: string;
  region: string;
  start_salary_range: string;
  end_salary_range: string;
  end_date?: string;
  created_at: Date;
  updated_at: Date;
}
