export default interface IVacancyCreateDTO {
  description: string;
  title: string;
  company_id: string;

  region?: string;
  salary_range?: string;
}
