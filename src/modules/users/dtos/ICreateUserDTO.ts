export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  identifier: string;
  confirm_password: string;

  description?: string;
  is_contractor?: boolean;
  is_teacher?: boolean;
  soft_skills?: Array<{
    soft_skill_id: string;
    stars: number;
  }>;
  work_areas_ids?: Array<string>;
}
