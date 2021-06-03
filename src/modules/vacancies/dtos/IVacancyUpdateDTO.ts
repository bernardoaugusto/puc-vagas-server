export default interface IVacancyUpdateDTO {
  description?: string;
  title?: string;
  region?: string;
  start_salary_range?: string;
  end_salary_range?: string;
  work_areas_ids: Array<string>;
  end_date?: string;
}
