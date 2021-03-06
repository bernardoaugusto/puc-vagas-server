import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICraeteChatDTO } from '../dtos/ISendMessageDTO';
import IChatRepository from '../repositories/IChatRepository';

@injectable()
export default class CreateChatService {
  constructor(
    @inject('ChatRepository')
    private chatRepository: IChatRepository,
  ) {}

  public async execute({
    vacancy_id,
    send_by,
    send_to,
  }: ICraeteChatDTO): Promise<void> {
    if (send_by === send_to) {
      throw new AppError(`You can't send message to yourself`);
    }

    let has_chat_for_recipient = await this.chatRepository.findByUserId(send_to);
    let has_chat_for_sender = await this.chatRepository.findByUserId(send_by);

    if (!has_chat_for_recipient) {
      has_chat_for_recipient = await this.chatRepository.create({
        chats: [
          {
            messages: [],
            vacancy_id,
            user_id: send_by,
          },
        ],
        user_id: send_to,
      });
    } else {
      const has_chat_for_vacancy_on_recipient = has_chat_for_recipient.chats.find(chat => chat.vacancy_id === vacancy_id);
  
      if(!has_chat_for_vacancy_on_recipient){
        has_chat_for_recipient.chats.push({
          messages: [],
          vacancy_id,
          user_id: send_by,
        })
      }

      await this.chatRepository.save(has_chat_for_recipient);
    }
    

    if (!has_chat_for_sender) {
      has_chat_for_sender = await this.chatRepository.create({
        chats: [
          {
            messages: [],
            vacancy_id,
            user_id: send_to,
          },
        ],
        user_id: send_by,
      });
    } else {
      const has_chat_for_vacancy_on_sender = has_chat_for_sender.chats.find(chat => chat.vacancy_id === vacancy_id);
  
      if(!has_chat_for_vacancy_on_sender){
        has_chat_for_sender.chats.push({
          messages: [],
          vacancy_id,
          user_id: send_to,
        })
      }

      await this.chatRepository.save(has_chat_for_sender);
    }

  }
}
