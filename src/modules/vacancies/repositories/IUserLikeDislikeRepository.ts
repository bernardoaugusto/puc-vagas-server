import ILikeDislikeVacancyDTO from '../dtos/ILikeDislikeVacancyDTO';
import VacancyLikeDislike from '../infra/typeorm/schemas/VacancyLikeDislike';

export default interface IUserLikeDislikeRepository {
  create(data: ILikeDislikeVacancyDTO): Promise<VacancyLikeDislike>;
  update(data: VacancyLikeDislike): Promise<VacancyLikeDislike>;
  findByVacancyId(vacancy_id: string): Promise<VacancyLikeDislike | undefined>;
}
