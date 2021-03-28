import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import validateNameAndEmailOfUser from '@modules/users/common/validations/validateNameEmailOfUser';
import UsersContractController from '../controllers/UsersContractController';

const usersContractRoutes = Router();
const usersContractController = new UsersContractController();

usersContractRoutes.post(
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
  usersContractController.create,
);

usersContractRoutes.put(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        ...validateNameAndEmailOfUser,
      },
    },
    configValidateRoute,
  ),
  usersContractController.update,
);

usersContractRoutes.patch(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    configValidateRoute,
  ),
  usersContractController.inactivate,
);

export default usersContractRoutes;
