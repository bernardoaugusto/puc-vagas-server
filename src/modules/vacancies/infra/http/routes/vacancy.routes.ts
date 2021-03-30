import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import configValidateRoute from '../../../../../config/route';
import VacancyController from '../controllers/VacancyController';
import createVacancySchema from '../../../common/validations/createVacancyValidator';
import updateVacancySchema from '../../../common/validations/updateVacancyValidator';
import validateIdSchema from '../../../../../shared/common/validations/validateId';

const router = Router();
const vacancyController = new VacancyController();

router.post(
  '/',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: createVacancySchema,
    },
    configValidateRoute,
  ),
  vacancyController.create,
);

router.get(
  '/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  vacancyController.getById,
);

router.get('/', vacancyController.getAll);

router.put(
  '/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: updateVacancySchema,
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  vacancyController.update,
);

router.delete(
  '/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  vacancyController.remove,
);

export default router;
