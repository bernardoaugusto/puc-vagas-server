import { Joi } from 'celebrate';

export const updateWorkAreasSchema = {
    description: Joi.string().strict(true).optional(),
};
