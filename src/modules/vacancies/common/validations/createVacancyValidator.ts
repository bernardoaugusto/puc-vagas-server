import { Joi } from 'celebrate';

export default {
  description: Joi.string().strict(true).required(),
  title: Joi.string().strict(true).required(),
  region: Joi.string().strict(true).required(),
  salary_range: Joi.string().strict(true).required(),
  company_id: Joi.string().uuid().strict(true).required(),
  soft_skills: Joi.array()
    .items(
      Joi.object({
        soft_skill_id: Joi.string().required(),
        stars: Joi.number().required(),
      }),
    )
    .optional(),
};
