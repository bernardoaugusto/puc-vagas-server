import { inject, injectable } from 'tsyringe';
import {
    formatParamsToTypeOrmOptionsWithPaginate,
    formatParamsToTypeOrmOptionsWithoutPaginate,
    formatPaginateDataToResponse,
} from '@seidor-cloud-produtos/typeorm';

import UserSoftSkills from '../infra/typeorm/entities/UserSoftSkills';
import IUserSoftSkillsRequestGetAllDTO from '../dtos/IUserSoftSkillsRequestGetAllDTO';
import IUserSoftSkillsRepositoryDTO from '../repositories/IUserSoftSkillsRepositoryDTO';

@injectable()
export default class GetAllUserSoftSkillsService {
    constructor(
        @inject('UserSoftSkillsRepository')
        private userSoftSkillsRepository: IUserSoftSkillsRepositoryDTO,
    ) {}

    public async execute(
        queryParams: IUserSoftSkillsRequestGetAllDTO,
        withPagination: boolean,
    ): Promise<
        | UserSoftSkills[]
        | ({
              data: UserSoftSkills[];
          } & {
              count: number;
              limit: number;
              page: number;
              totalPages: number;
          })
    > {
        if (withPagination) {
            const options = formatParamsToTypeOrmOptionsWithPaginate(
                queryParams,
                true,
            );

            const arrayUserSoftSkills = await this.userSoftSkillsRepository.getAllWithPagination(
                options,
            );

            return formatPaginateDataToResponse(queryParams, arrayUserSoftSkills);
        }

        const options = formatParamsToTypeOrmOptionsWithoutPaginate(
            queryParams,
            true,
        );

        return this.userSoftSkillsRepository.getAllWithoutPagination(options);
    }
}
