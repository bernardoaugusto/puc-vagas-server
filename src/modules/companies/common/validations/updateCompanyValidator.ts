import { Joi } from 'celebrate';

export const updateCompanySchema = {
    name: Joi.string().strict(true).optional(),
    cnpj: Joi.string().strict(true).optional(),
};
