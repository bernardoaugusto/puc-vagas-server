import { Joi } from 'celebrate';

export default {
  desription: Joi.string().strict(true).required(),
  title: Joi.string().strict(true).required(),
  region: Joi.string().strict(true).required(),
  salary_range: Joi.string().strict(true).required(),
};
