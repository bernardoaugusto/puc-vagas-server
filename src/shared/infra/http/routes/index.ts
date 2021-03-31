import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersContractororRouter from '@modules/users/infra/http/routes/usersContractor.routes';
import usersTeacherRouter from '@modules/users/infra/http/routes/usersTeacher.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import softSkillsRouter from '@modules/softSkills/infra/http/routes/softSkill.routes';
import vacanciesRouter from '@modules/vacancies/infra/http/routes/vacancy.routes';
import companiesRouter from '@modules/companies/infra/http/routes/company.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/teachers', usersTeacherRouter);
routes.use('/api/contractors', usersContractororRouter);
routes.use('/api/sessions', sessionsRouter);
routes.use('/api/password', passwordRouter);
routes.use('/api/soft-skills ', ensureAuthenticated, softSkillsRouter);
routes.use('/api/vacancies', ensureAuthenticated, vacanciesRouter);
routes.use('/api/companies', ensureAuthenticated, companiesRouter);

export default routes;
