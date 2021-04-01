import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import configValidateRoute from '../../../../../config/route';
import HardSkillsController from '../controllers/HardSkillsController';
import { createHardSkillsSchema } from '../../../common/validations/createHardSkillsValidator';
import { updateHardSkillsSchema } from '../../../common/validations/updateHardSkillsValidator';
import validateIdSchema from '../../../../../shared/common/validations/validateId';

const router = Router();
const hardSkillsController = new HardSkillsController();

router.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: createHardSkillsSchema,
    },
    configValidateRoute,
  ),
  hardSkillsController.create,
);

router.get(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  hardSkillsController.getById,
);

router.get('/', hardSkillsController.getAll);

router.put(
  '/:id',
  celebrate(
    {
      [Segments.BODY]: updateHardSkillsSchema,
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  hardSkillsController.update,
);

router.delete(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  hardSkillsController.remove,
);

export default router;
