import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersContractororRouter from '@modules/users/infra/http/routes/usersContractor.routes';
import usersTeacherRouter from '@modules/users/infra/http/routes/usersTeacher.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import softSkillsRouter from '@modules/softSkills/infra/http/routes/softSkill.routes';
import vacanciesRouter from '@modules/vacancies/infra/http/routes/vacancy.routes';
import companiesRouter from '@modules/companies/infra/http/routes/company.routes';
import userSoftSkills from '@modules/userSoftSkills/infra/http/routes/userSoftSkills.routes';
import vacancySoftSkills from '@modules/vacancySoftSkills/infra/http/routes/vacancySoftSkills.routes';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/teachers', usersTeacherRouter);
routes.use('/api/contractors', usersContractororRouter);
routes.use('/api/sessions', sessionsRouter);
routes.use('/api/password', passwordRouter);
routes.use('/api/soft-skills ', ensureAuthenticated, softSkillsRouter);
routes.use('/api/vacancies', ensureAuthenticated, vacanciesRouter);
routes.use('/api/companies', ensureAuthenticated, companiesRouter);
routes.use('/api/user-soft-skills', ensureAuthenticated, userSoftSkills);
routes.use('/api/user-soft-skills', ensureAuthenticated, vacancySoftSkills);

export default routes;
