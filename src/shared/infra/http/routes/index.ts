import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersContractorRouter from '@modules/users/infra/http/routes/usersContract.routes';
import usersTeacherRouter from '@modules/users/infra/http/routes/usersTeacher.routes';

import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/teachers', usersTeacherRouter);
routes.use('/api/contractors', usersContractorRouter);
routes.use('/api/sessions', sessionsRouter);
routes.use('/api/password', passwordRouter);

export default routes;
