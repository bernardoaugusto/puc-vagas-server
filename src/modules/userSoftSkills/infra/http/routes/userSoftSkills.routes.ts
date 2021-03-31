import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import configValidateRoute from '../../../../../config/route';
import UserSoftSkillsController from '../controllers/UserSoftSkillsController';
import { createUserSoftSkillsSchema } from '../../../common/validations/createUserSoftSkillsValidator';
import { updateUserSoftSkillsSchema } from '../../../common/validations/updateUserSoftSkillsValidator';
import validateIdSchema from '../../../../../shared/common/validations/validateId';

const router = Router();
const userSoftSkillsController = new UserSoftSkillsController();

router.post(
    '/',
    celebrate(
        {
            [Segments.BODY]: createUserSoftSkillsSchema,
        },
        configValidateRoute,
    ),
    userSoftSkillsController.create,
);

router.get(
    '/:id',
    celebrate(
        {
            [Segments.PARAMS]: validateIdSchema,
        },
        configValidateRoute,
    ),
    userSoftSkillsController.getById,
);

router.get('/', userSoftSkillsController.getAll);

router.put(
    '/:id',
    celebrate(
        {
            [Segments.BODY]: updateUserSoftSkillsSchema,
            [Segments.PARAMS]: validateIdSchema,
        },
        configValidateRoute,
    ),
    userSoftSkillsController.update,
);

router.delete(
    '/:id',
    celebrate(
        {
            [Segments.PARAMS]: validateIdSchema,
        },
        configValidateRoute,
    ),
    userSoftSkillsController.remove,
);

export default router;
