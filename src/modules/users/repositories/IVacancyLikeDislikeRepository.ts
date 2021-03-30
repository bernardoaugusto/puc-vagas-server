import VacancyLikeDislike from '@modules/vacancies/infra/typeorm/schemas/VacancyLikeDislike';
import ILikeDislikeVacancyDTO from '../dtos/ILikeDislikeVacancyDTO';

export default interface IVacancyLikeDislikeRepository {
  create(data: ILikeDislikeVacancyDTO): Promise<VacancyLikeDislike>;
  update(data: VacancyLikeDislike): Promise<VacancyLikeDislike>;
  findByUserId(user_id: string): Promise<VacancyLikeDislike>;
}
