export default interface ILikeDislikeVacancyDTO {
  user_id: string;
  likes: Array<string>;
  dislikes: Array<string>;
  matches: Array<string>;
  recommendations: Array<string>;
}
