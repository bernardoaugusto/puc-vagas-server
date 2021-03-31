/* eslint-disable import/prefer-default-export */
import { Joi } from 'celebrate';

export const updateHardSkillsSchema = {
  description: Joi.string().strict(true).optional(),
  stars: Joi.number().strict(true).optional(),
};
