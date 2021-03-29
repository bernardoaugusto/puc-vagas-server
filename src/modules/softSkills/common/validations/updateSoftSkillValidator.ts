/* eslint-disable import/prefer-default-export */
import { Joi } from 'celebrate';

export const updateSoftSkillSchema = {
  description: Joi.string().strict(true).optional(),
};
