import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import configValidateRoute from '@config/route';
import validateNameAndEmailOfUser from '@modules/users/common/validations/validateNameEmailOfUser';
import UsersContractorController from '../controllers/UsersContractorController';

const usersContractorRoutes = Router();
const usersContractorController = new UsersContractorController();

usersContractorRoutes.post(
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
  usersContractorController.create,
);

usersContractorRoutes.put(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        ...validateNameAndEmailOfUser,
      },
    },
    configValidateRoute,
  ),
  usersContractorController.update,
);

usersContractorRoutes.patch(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    },
    configValidateRoute,
  ),
  usersContractorController.inactivate,
);

export default usersContractorRoutes;
