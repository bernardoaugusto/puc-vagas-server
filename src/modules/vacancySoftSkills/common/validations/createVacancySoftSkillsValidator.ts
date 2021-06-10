/* eslint-disable import/prefer-default-export */
import { Joi } from 'celebrate';

export const createVacancySoftSkillsSchema = {
  vacancy_id: Joi.string().strict(true).required(),
  soft_skill_id: Joi.string().strict(true).required(),
  stars: Joi.number().strict(true).required(),
  priority: Joi.number().strict(true).required()
};
