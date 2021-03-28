import { Joi } from 'celebrate';

export default {
  desription: Joi.string().strict(true).optional(),
  title: Joi.string().strict(true).optional(),
  region: Joi.string().strict(true).optional(),
  salary_range: Joi.string().strict(true).optional(),
};
