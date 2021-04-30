import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import WorkAreas from '@modules/workAreas/infra/typeorm/entities/WorkAreas';
import GetByIdWorkAreasService from '@modules/workAreas/services/GetByIdWorkAreasService';
import IUsersRepository from '../repositories/IUsersRepository';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GetByIdWorkAreasService')
    private getByIdWorkAreasService: GetByIdWorkAreasService,
  ) {}

  public async execute(userDataToUpdate: IUpdateUserDTO, id: string): Promise<User> {
    const updates = userDataToUpdate;
    const workAreasIds = updates.work_areas_ids;
    updates.work_areas_ids = [];

    const finded_user = await this.usersRepository.findById(id);

    if (!finded_user) {
      throw new AppError('User not found');
    }

    Object.assign(finded_user, updates);

    if (workAreasIds) {
      const getWorkAreas: Array<WorkAreas> = [];
      for (const idWorkAreas of workAreasIds) {
        getWorkAreas.push(await this.getByIdWorkAreasService.execute(idWorkAreas));
      }

      if (getWorkAreas.length !== workAreasIds.length)
        throw new AppError('There are unregistered work areas');

      finded_user.work_areas = getWorkAreas;
    } else finded_user.work_areas = [];

    return this.usersRepository.save(finded_user);
  }
}
