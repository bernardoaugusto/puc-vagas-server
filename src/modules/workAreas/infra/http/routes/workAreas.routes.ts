import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import configValidateRoute from '../../../../../config/route';
import WorkAreasController from '../controllers/WorkAreasController';
import { createWorkAreasSchema } from '../../../common/validations/createWorkAreasValidator';
import { updateWorkAreasSchema } from '../../../common/validations/updateWorkAreasValidator';
import validateIdSchema from '../../../../../shared/common/validations/validateId';

const router = Router();
const workAreasController = new WorkAreasController();

router.post(
    '/',
    celebrate(
        {
            [Segments.BODY]: createWorkAreasSchema,
        },
        configValidateRoute,
    ),
    workAreasController.create,
);

router.get(
    '/:id',
    celebrate(
        {
            [Segments.PARAMS]: validateIdSchema,
        },
        configValidateRoute,
    ),
    workAreasController.getById,
);

router.get('/', workAreasController.getAll);

router.put(
    '/:id',
    celebrate(
        {
            [Segments.BODY]: updateWorkAreasSchema,
            [Segments.PARAMS]: validateIdSchema,
        },
        configValidateRoute,
    ),
    workAreasController.update,
);

router.delete(
    '/:id',
    celebrate(
        {
            [Segments.PARAMS]: validateIdSchema,
        },
        configValidateRoute,
    ),
    workAreasController.remove,
);

export default router;
