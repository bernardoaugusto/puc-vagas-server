import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import validateNameAndEmailOfUser from '@modules/users/common/validations/validateNameEmailOfUser';
import UsersTeacherController from '../controllers/UsersTeacherController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureTeacher from '../middlewares/ensureTeacher';

const usersTeacherRoutes = Router();
const usersTeacherController = new UsersTeacherController();

usersTeacherRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone_number: Joi.string().required(),
        identifier: Joi.string().required(),
        password: Joi.string().required(),
        confirm_password: Joi.string().required(),
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

usersTeacherRoutes.patch(
  '/recommend/:id',
  ensureAuthenticated,
  ensureTeacher,
  usersTeacherController.recommend,
);

export default usersTeacherRoutes;
