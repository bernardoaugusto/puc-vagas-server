import { container } from 'tsyringe';
import './providers';

import '@modules/users/providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

// Soft Skills
import ISoftSkillRepositoryDTO from '@modules/softSkills/repositories/ISoftSkillRepositoryDTO';
import SoftSkillRepository from '@modules/softSkills/infra/typeorm/repositories/SoftSkillRepository';
import GetByIdSoftSkillService from '@modules/softSkills/services/GetByIdSoftSkillService';

// Vacancies
import IVacancyRepositoryDTO from '@modules/vacancies/repositories/IVacancyRepositoryDTO';
import VacancyRepository from '@modules/vacancies/infra/typeorm/repositories/VacancyRepository';
import GetByIdVacancyService from '@modules/vacancies/services/GetByIdVacancyService';

// Companies
import ICompanyRepositoryDTO from '@modules/companies/repositories/ICompanyRepositoryDTO';
import CompanyRepository from '@modules/companies/infra/typeorm/repositories/CompanyRepository';
import GetByIdCompanyService from '@modules/companies/services/GetByIdCompanyService';

// UserSoftSkills
import IUserSoftSkillsRepositoryDTO from '@modules/userSoftSkills/repositories/IUserSoftSkillsRepositoryDTO';
import UserSoftSkillsRepository from '@modules/userSoftSkills/infra/typeorm/repositories/UserSoftSkillsRepository';
import GetByIdUserSoftSkillsService from '@modules/userSoftSkills/services/GetByIdUserSoftSkillsService';
import CreateUserSoftSkillsService from '@modules/userSoftSkills/services/CreateUserSoftSkillsService';

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

// Soft Skills
container.registerSingleton<ISoftSkillRepositoryDTO>(
  'SoftSkillRepository',
  SoftSkillRepository,
);
container.registerSingleton<GetByIdSoftSkillService>(
  'GetByIdSoftSkillService',
  GetByIdSoftSkillService,
);

// Companies
container.registerSingleton<ICompanyRepositoryDTO>(
  'CompanyRepository',
  CompanyRepository,
);
container.registerSingleton<GetByIdCompanyService>(
  'GetByIdCompanyService',
  GetByIdCompanyService,
);

// UserSoftSkills
container.registerSingleton<IUserSoftSkillsRepositoryDTO>(
  'UserSoftSkillsRepository',
  UserSoftSkillsRepository,
);
container.registerSingleton<GetByIdUserSoftSkillsService>(
  'GetByIdUserSoftSkillsService',
  GetByIdUserSoftSkillsService,
);
container.registerSingleton<CreateUserSoftSkillsService>(
  'CreateUserSoftSkillsService',
  CreateUserSoftSkillsService,
);
