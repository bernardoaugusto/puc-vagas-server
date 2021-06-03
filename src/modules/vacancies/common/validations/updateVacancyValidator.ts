import { Joi } from 'celebrate';

export default {
  description: Joi.string().strict(true).optional(),
  title: Joi.string().strict(true).optional(),
  region: Joi.string().strict(true).optional(),
  start_salary_range: Joi.string().strict(true).optional(),
  end_salary_range: Joi.string().strict(true).optional(),
  work_areas_ids: Joi.array().items(Joi.string().uuid().required()).optional(),
  end_date: Joi.string()
    .strict(true)
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .optional(),
};
