import { Joi } from 'celebrate';

export const updateUserSoftSkillsSchema = {
    user_id: Joi.string().strict(true).optional(),
    soft_skill_id: Joi.string().strict(true).optional(),
    stars: Joi.number().strict(true).optional(),
};
