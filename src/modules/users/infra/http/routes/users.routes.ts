import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import configValidateRoute from '@config/route';
import {
  validateDataOfCreateUser,
  validateId,
  validateUserData,
} from '@modules/users/common/validations/validateNameEmailOfUser';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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
        ...validateUserData,
      },
      [Segments.PARAMS]: {
        ...validateId,
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

usersRouter.post('/like/:id', ensureAuthenticated, usersController.like);
usersRouter.post('/dislike/:id', ensureAuthenticated, usersController.dislike);
usersRouter.get(
  '/get-all/likes',
  ensureAuthenticated,
  usersController.getAllUsersForLike,
);

usersRouter.get('/:id', ensureAuthenticated, usersController.getUserById);

export default usersRouter;
