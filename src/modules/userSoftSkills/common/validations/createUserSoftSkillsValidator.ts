import { Joi } from 'celebrate';

export const createUserSoftSkillsSchema = {
    user_id: Joi.string().strict(true).required(),
    soft_skill_id: Joi.string().strict(true).required(),
    stars: Joi.number().strict(true).required(),
};
