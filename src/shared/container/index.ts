import { container } from 'tsyringe';
import './providers';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import ISoftSkillRepositoryDTO from '@modules/softSkills/repositories/ISoftSkillRepositoryDTO';
import SoftSkillRepository from '@modules/softSkills/infra/typeorm/repositories/SoftSkillRepository';
import GetByIdSoftSkillService from '@modules/softSkills/services/GetByIdSoftSkillService';
import IVacancyRepositoryDTO from '@modules/vacancies/repositories/IVacancyRepositoryDTO';
import VacancyRepository from '@modules/vacancies/infra/typeorm/repositories/VacancyRepository';
import GetByIdVacancyService from '@modules/vacancies/services/GetByIdVacancyService';

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository);
container.registerSingleton<IUsersTokenRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

// Vacancies
container.registerSingleton<IVacancyRepositoryDTO>(
  'VacancyRepository',
  VacancyRepository,
);
container.registerSingleton<GetByIdVacancyService>(
  'GetByIdVacancyService',
  GetByIdVacancyService,
);

// Soft Skill
container.registerSingleton<ISoftSkillRepositoryDTO>(
  'SoftSkillRepository',
  SoftSkillRepository,
);
container.registerSingleton<GetByIdSoftSkillService>(
  'GetByIdSoftSkillService',
  GetByIdSoftSkillService,
);
