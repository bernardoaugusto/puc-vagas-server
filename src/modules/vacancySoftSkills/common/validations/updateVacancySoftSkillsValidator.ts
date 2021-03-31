/* eslint-disable import/prefer-default-export */
import { Joi } from 'celebrate';

export const updateVacancySoftSkillsSchema = {
  stars: Joi.number().strict(true).required(),
};
