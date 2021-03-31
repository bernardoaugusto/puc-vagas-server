/* eslint-disable import/prefer-default-export */
import { Joi } from 'celebrate';

export const updateUserSoftSkillsSchema = {
  stars: Joi.number().strict(true).required(),
};
