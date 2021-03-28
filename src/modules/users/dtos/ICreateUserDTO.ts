export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  identifier: string;

  is_contract?: boolean;
  is_teacher?: boolean;
}
