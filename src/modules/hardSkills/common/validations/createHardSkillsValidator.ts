/* eslint-disable import/prefer-default-export */
import { Joi } from 'celebrate';

export const createHardSkillsSchema = {
  description: Joi.string().strict(true).required(),
  stars: Joi.number().strict(true).required(),
};
