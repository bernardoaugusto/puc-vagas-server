import { Joi } from 'celebrate';

const validateNameAndEmailOfUser = {
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
};

export const validateUserData = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  identifier: Joi.string().required(),
  password: Joi.string().required(),
};

export const validateDataOfCreateUser = {
  ...validateUserData,
  confirm_password: Joi.string().required(),
};

export const validateId = {
  id: Joi.string().uuid().required(),
};

export default validateNameAndEmailOfUser;
