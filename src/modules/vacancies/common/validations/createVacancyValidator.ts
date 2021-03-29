import { Joi } from 'celebrate';

export default {
  description: Joi.string().strict(true).required(),
  title: Joi.string().strict(true).required(),
  region: Joi.string().strict(true).required(),
  salary_range: Joi.string().strict(true).required(),
};
