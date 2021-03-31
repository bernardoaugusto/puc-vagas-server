import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import configValidateRoute from '../../../../../config/route';
import VacancySoftSkillsController from '../controllers/VacancySoftSkillsController';
import { createVacancySoftSkillsSchema } from '../../../common/validations/createVacancySoftSkillsValidator';
import { updateVacancySoftSkillsSchema } from '../../../common/validations/updateVacancySoftSkillsValidator';
import validateIdSchema from '../../../../../shared/common/validations/validateId';

const router = Router();
const vacancySoftSkillsController = new VacancySoftSkillsController();

router.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: createVacancySoftSkillsSchema,
    },
    configValidateRoute,
  ),
  vacancySoftSkillsController.create,
);

router.get(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  vacancySoftSkillsController.getById,
);

router.get('/', vacancySoftSkillsController.getAll);

router.put(
  '/:id',
  celebrate(
    {
      [Segments.BODY]: updateVacancySoftSkillsSchema,
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  vacancySoftSkillsController.update,
);

router.delete(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  vacancySoftSkillsController.remove,
);

export default router;
