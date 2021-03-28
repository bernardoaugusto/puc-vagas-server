import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import validateNameAndEmailOfUser from '@modules/users/common/validations/validateNameEmailOfUser';
import UsersTeacherController from '../controllers/UsersTeacherController';

const usersTeacherRoutes = Router();
const usersTeacherController = new UsersTeacherController();

usersTeacherRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        password: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
    },
    configValidateRoute,
  ),
  usersTeacherController.create,
);

usersTeacherRoutes.put(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        ...validateNameAndEmailOfUser,
      },
    },
    configValidateRoute,
  ),
  usersTeacherController.update,
);

usersTeacherRoutes.patch(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    configValidateRoute,
  ),
  usersTeacherController.inactivate,
);

export default usersTeacherRoutes;
