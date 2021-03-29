import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import configValidateRoute from '../../../../../config/route';
import CompanyController from '../controllers/CompanyController';
import { createCompanySchema } from '../../../common/validations/createCompanyValidator';
import { updateCompanySchema } from '../../../common/validations/updateCompanyValidator';
import validateIdSchema from '../../../../../shared/common/validations/validateId';

const router = Router();
const companyController = new CompanyController();

router.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: createCompanySchema,
    },
    configValidateRoute,
  ),
  companyController.create,
);

router.get(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  companyController.getById,
);

router.get('/', companyController.getAll);

router.put(
  '/:id',
  celebrate(
    {
      [Segments.BODY]: updateCompanySchema,
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  companyController.update,
);

router.delete(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  companyController.remove,
);

export default router;
