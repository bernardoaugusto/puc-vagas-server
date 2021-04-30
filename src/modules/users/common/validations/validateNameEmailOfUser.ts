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
  description: Joi.string().optional(),
};

export const validateDataOfCreateUser = {
  ...validateUserData,
  confirm_password: Joi.string().required(),
  soft_skills: Joi.array()
    .items(
      Joi.object({
        soft_skill_id: Joi.string().uuid().required(),
        stars: Joi.number().required(),
      }),
    )
    .optional(),
  work_areas_ids: Joi.array().items(Joi.string().uuid().required()).optional(),
};

export const validateDataOfUpdateUser = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().required(),
  identifier: Joi.string().required(),
  description: Joi.string().optional(),
  work_areas_ids: Joi.array().items(Joi.string().uuid().required()).optional(),
};

export const validateId = {
  id: Joi.string().uuid().required(),
};

export default validateNameAndEmailOfUser;
