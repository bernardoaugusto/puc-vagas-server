import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import configValidateRoute from '../../../../../config/route';
import SoftSkillController from '../controllers/SoftSkillController';
import { createSoftSkillSchema } from '../../../common/validations/createSoftSkillValidator';
import { updateSoftSkillSchema } from '../../../common/validations/updateSoftSkillValidator';
import validateIdSchema from '../../../../../shared/common/validations/validateId';

const router = Router();
const softSkillController = new SoftSkillController();

router.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: createSoftSkillSchema,
    },
    configValidateRoute,
  ),
  softSkillController.create,
);

router.get(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  softSkillController.getById,
);

router.get('/', softSkillController.getAll);

router.put(
  '/:id',
  celebrate(
    {
      [Segments.BODY]: updateSoftSkillSchema,
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  softSkillController.update,
);

router.delete(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  softSkillController.remove,
);

export default router;
