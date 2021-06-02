export default interface ISendMessageDTO {
  send_by: string;
  send_to: string;
  message: string;
}

export interface ICraeteChatDTO {
  send_by: string;
  send_to: string;
  vacancy_id: string;
}
