export default interface IUpdateUserDTO {
  name: string;
  email: string;
  phone_number: string;
  identifier: string;
  description: string;
  work_areas_ids: Array<string>;
}
