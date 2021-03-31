/* eslint-disable import/prefer-default-export */
import { Joi } from 'celebrate';

export const updateVacancySoftSkillsSchema = {
  vacancy_id: Joi.string().strict(true).optional(),
  soft_skill_id: Joi.string().strict(true).optional(),
  stars: Joi.number().strict(true).optional(),
};
