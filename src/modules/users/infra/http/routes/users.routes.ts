import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import configValidateRoute from '@config/route';
import {
  validateDataOfCreateUser,
  validateDataOfUpdateUser,
  validateId,
} from '@modules/users/common/validations/validateNameEmailOfUser';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import validateIdSchema from '../../../../../shared/common/validations/validateId';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        ...validateDataOfCreateUser,
      },
    },
    configValidateRoute,
  ),
  usersController.create,
);

usersRouter.put(
  '/',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        ...validateDataOfUpdateUser,
      },
    },
    configValidateRoute,
  ),
  usersController.update,
);

usersRouter.patch(
  '/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.PARAMS]: {
        ...validateId,
      },
    },
    configValidateRoute,
  ),
  usersController.inactivate,
);

usersRouter.put(
  '/company-employee/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        company_id: Joi.string().uuid().required(),
      },
      [Segments.PARAMS]: {
        ...validateId,
      },
    },
    configValidateRoute,
  ),
  usersController.companyEmployee,
);

usersRouter.delete(
  '/company-employee/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.BODY]: {
        company_id: Joi.string().uuid().required(),
      },
      [Segments.PARAMS]: {
        ...validateId,
      },
    },
    configValidateRoute,
  ),
  usersController.removeCompanyEmployee,
);

usersRouter.post('/like/:id', ensureAuthenticated, usersController.like);
usersRouter.post('/dislike/:id', ensureAuthenticated, usersController.dislike);
usersRouter.get(
  '/get-all/likes/:id',
  ensureAuthenticated,
  usersController.getAllUsersForLike,
);

usersRouter.get(
  '/get-all',
  ensureAuthenticated,
  usersController.getAllUsers,
);

usersRouter.get('/:id', ensureAuthenticated, usersController.getUserById);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate(
    {
      [Segments.PARAMS]: validateIdSchema,
    },
    configValidateRoute,
  ),
  usersController.remove,
);
export default usersRouter;
