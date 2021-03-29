import { container } from 'tsyringe';
import './providers';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import IVacancyRepository from '@modules/vacancies/repositories/IVacancyRepositoryDTO';
import VacancyRepository from '@modules/vacancies/infra/typeorm/repositories/VacancyRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository);
container.registerSingleton<IUsersTokenRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IVacancyRepository>(
  'VagancyRepository',
  VacancyRepository,
);
