export default interface ILikeDislikeVacancyDTO {
  vacancy_id: string;
  likes: Array<string>;
  dislikes: Array<string>;
}
