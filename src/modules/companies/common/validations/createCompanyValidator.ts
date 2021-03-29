import { Joi } from 'celebrate';

export const createCompanySchema = {
    name: Joi.string().strict(true).required(),
    cnpj: Joi.string().strict(true).required(),
};
