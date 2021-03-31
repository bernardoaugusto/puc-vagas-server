import { container } from 'tsyringe';
import './providers';

import '@modules/users/providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import VacancyRepository from '@modules/vacancies/infra/typeorm/repositories/VacancyRepository';

// Soft Skills
import ISoftSkillRepositoryDTO from '@modules/softSkills/repositories/ISoftSkillRepositoryDTO';
import SoftSkillRepository from '@modules/softSkills/infra/typeorm/repositories/SoftSkillRepository';
import GetByIdSoftSkillService from '@modules/softSkills/services/GetByIdSoftSkillService';

// Work Areas
import IWorkAreasRepositoryDTO from '@modules/workAreas/repositories/IWorkAreasRepositoryDTO';
import WorkAreasRepository from '@modules/workAreas/infra/typeorm/repositories/WorkAreasRepository';
import GetByIdWorkAreasService from '@modules/workAreas/services/GetByIdWorkAreasService';

// Vacancies
import IVacancyRepositoryDTO from '@modules/vacancies/repositories/IVacancyRepositoryDTO';
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

// VacancySoftSkills
import IVacancySoftSkillsRepositoryDTO from '@modules/vacancySoftSkills/repositories/IVacancySoftSkillsRepositoryDTO';
import VacancySoftSkillsRepository from '@modules/vacancySoftSkills/infra/typeorm/repositories/VacancySoftSkillsRepository';
import GetByIdVacancySoftSkillsService from '@modules/vacancySoftSkills/services/GetByIdVacancySoftSkillsService';
import CreateVacancySoftSkillsService from '@modules/vacancySoftSkills/services/CreateVacancySoftSkillsService';

// VacancyLike
import IVacancyLikeDislikeRepository from '@modules/vacancies/repositories/IVacancyLikeDislikeRepository';
import VacancyLikeDislikeRepository from '@modules/vacancies/infra/typeorm/repositories/VacancyLikeDislikeRepository';

// UserLike
import IUserLikeDislikeRepository from '@modules/users/repositories/IUserLikeDislikeRepository';
import UserLikeDislikeRepository from '@modules/users/infra/typeorm/repositories/UserLikeDislikeRepository';

// Chat
import IChatRepository from '@modules/chats/repositories/IChatRepository';
import ChatRepository from '@modules/chats/infra/typeorm/repositories/ChatRepository';

// Hard Skills
import IHardSkillsRepositoryDTO from '@modules/hardSkills/repositories/IHardSkillsRepositoryDTO';
import HardSkillsRepository from '@modules/hardSkills/infra/typeorm/repositories/HardSkillsRepository';
import GetByIdHardSkillsService from '@modules/hardSkills/services/GetByIdHardSkillsService';

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

// Work Areas
container.registerSingleton<IWorkAreasRepositoryDTO>(
  'WorkAreasRepository',
  WorkAreasRepository,
);
container.registerSingleton<GetByIdWorkAreasService>(
  'GetByIdWorkAreasService',
  GetByIdWorkAreasService,
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

// VacancySoftSkills
container.registerSingleton<IVacancySoftSkillsRepositoryDTO>(
  'VacancySoftSkillsRepository',
  VacancySoftSkillsRepository,
);
container.registerSingleton<GetByIdVacancySoftSkillsService>(
  'GetByIdVacancySoftSkillsService',
  GetByIdVacancySoftSkillsService,
);
container.registerSingleton<CreateVacancySoftSkillsService>(
  'CreateVacancySoftSkillsService',
  CreateVacancySoftSkillsService,
);

// VacancyLike
container.registerSingleton<IVacancyLikeDislikeRepository>(
  'VacancyLikeDislikeRepository',
  VacancyLikeDislikeRepository,
);

// UserLike
container.registerSingleton<IUserLikeDislikeRepository>(
  'UserLikeDislikeRepository',
  UserLikeDislikeRepository,
);

// Chat
container.registerSingleton<IChatRepository>('ChatRepository', ChatRepository);

// Hard Skills
container.registerSingleton<IHardSkillsRepositoryDTO>(
  'HardSkillsRepository',
  HardSkillsRepository,
);
container.registerSingleton<GetByIdHardSkillsService>(
  'GetByIdHardSkillsService',
  GetByIdHardSkillsService,
);
