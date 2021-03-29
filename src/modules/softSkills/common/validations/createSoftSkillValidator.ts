/* eslint-disable import/prefer-default-export */
import { Joi } from 'celebrate';

export const createSoftSkillSchema = {
  description: Joi.string().strict(true).required(),
};
