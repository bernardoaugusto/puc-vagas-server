/* eslint-disable import/prefer-default-export */
import { Joi } from 'celebrate';

// export const createUserSoftSkillsSchema = {
//   user_id: Joi.string().strict(true).required(),
//   soft_skill_id: Joi.string().strict(true).required(),
//   stars: Joi.number().strict(true).required(),
// };

export const createUserSoftSkillsSchema = {
  user_soft_skills: Joi.array()
    .items(
      Joi.object({
        user_id: Joi.string().strict(true).required(),
        soft_skill_id: Joi.string().strict(true).required(),
        stars: Joi.number().strict(true).required(),
      }),
    )
    .optional(),
};
