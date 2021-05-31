import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import GetByIdCompanyService from '@modules/companies/services/GetByIdCompanyService';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateVacancySoftSkillsService from '@modules/vacancySoftSkills/services/CreateVacancySoftSkillsService';
import GetByIdWorkAreasService from '@modules/workAreas/services/GetByIdWorkAreasService';
import WorkAreas from '@modules/workAreas/infra/typeorm/entities/WorkAreas';
import CreateHardSkillsService from '@modules/hardSkills/services/CreateHardSkillsService';
import Vacancy from '../infra/typeorm/entities/Vacancy';
import IVacancyCreateDTO from '../dtos/IVacancyCreateDTO';
import IVacancyRepositoryDTO from '../repositories/IVacancyRepositoryDTO';

@injectable()
export default class CreateVacancyService {
  constructor(
    @inject('VacancyRepository')
    private vacancyRepository: IVacancyRepositoryDTO,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GetByIdCompanyService')
    private getByIdCompanyService: GetByIdCompanyService,

    @inject('CreateVacancySoftSkillsService')
    private createVacancySoftSkillsService: CreateVacancySoftSkillsService,

    @inject('GetByIdWorkAreasService')
    private getByIdWorkAreasService: GetByIdWorkAreasService,

    @inject('CreateHardSkillsService')
    private createHardSkillsService: CreateHardSkillsService,
  ) {}

  public async execute(
    vacancyData: IVacancyCreateDTO,
    user: {
      id: string;
      is_contractor: boolean;
      is_teacher: boolean;
    },
  ): Promise<Vacancy> {
    if (!user.is_contractor) throw new AppError('User is not a recruiter', 400);

    const recruiter = (await this.usersRepository.findById(user.id)) as User;
    const companyFinded = await this.getByIdCompanyService.execute(
      vacancyData.company_id,
    );

    const registeredRecruiter = recruiter.companies.find(
      company => company.id === companyFinded.id,
    );

    // if (!registeredRecruiter)
    //   throw new AppError('The recruiter is already working at this company', 400);

    const vacancy = new Vacancy();
    Object.assign(vacancy, { ...vacancyData, recruiter_id: recruiter.id });

    if (vacancyData.work_areas_ids) {
      const getWorkAreas: Array<WorkAreas> = [];
      for (const idWorkAreas of vacancyData.work_areas_ids) {
        getWorkAreas.push(await this.getByIdWorkAreasService.execute(idWorkAreas));
      }

      if (getWorkAreas.length !== vacancyData.work_areas_ids.length)
        throw new AppError('There are unregistered work areas');

      vacancy.work_areas = getWorkAreas;
    }

    const createdVacancy = await this.vacancyRepository.create(vacancy);

    if (vacancyData.soft_skills)
      for (const softSkill of vacancyData.soft_skills) {
        await this.createVacancySoftSkillsService.execute({
          vacancy_id: createdVacancy.id,
          soft_skill_id: softSkill.soft_skill_id,
          stars: softSkill.stars,
        });
      }

    for (const hard_skills of vacancyData.hard_skills) {
      await this.createHardSkillsService.execute({
        ...hard_skills,
        vacancy_id: createdVacancy.id,
      });
    }

    return (await this.vacancyRepository.findById(createdVacancy.id)) as Vacancy;
  }
}
