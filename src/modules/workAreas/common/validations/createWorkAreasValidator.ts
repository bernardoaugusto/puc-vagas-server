import { Joi } from 'celebrate';

export const createWorkAreasSchema = {
    description: Joi.string().strict(true).required(),
};
