import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ISendMessageDTO from '../dtos/ISendMessageDTO';
import IChatRepository from '../repositories/IChatRepository';

@injectable()
export default class SendMessageService {
  constructor(
    @inject('ChatRepository')
    private chatRepository: IChatRepository,
  ) {}

  public async execute({
    message,
    send_by,
    send_to,
  }: ISendMessageDTO): Promise<void> {
    if (send_by === send_to) {
      throw new AppError(`You can't send message to yourself`);
    }

    let has_chat_for_recipient = await this.chatRepository.findByUserId(send_to);
    let has_chat_for_sender = await this.chatRepository.findByUserId(send_by);

    if (!has_chat_for_recipient) {
      has_chat_for_recipient = await this.chatRepository.create({
        chats: [],
        user_id: send_to,
      });
    }

    if (!has_chat_for_sender) {
      has_chat_for_sender = await this.chatRepository.create({
        chats: [],
        user_id: send_by,
      });
    }

    const conversation_between_recipient_and_sender_index = has_chat_for_recipient.chats.findIndex(
      item => item.user_id === send_by,
    );

    const conversation_between_sender_and_recipient_index = has_chat_for_sender.chats.findIndex(
      item => item.user_id === send_to,
    );

    if (conversation_between_recipient_and_sender_index >= 0) {
      const { messages } = has_chat_for_recipient.chats[
        conversation_between_recipient_and_sender_index
      ];

      messages.push({
        action: 'RECEIVED',
        message,
      });

      has_chat_for_recipient.chats[
        conversation_between_recipient_and_sender_index
      ].messages = messages;
    } else {
      has_chat_for_recipient.chats.push({
        user_id: send_by,
        messages: [
          {
            action: 'RECEIVED',
            message,
          },
        ],
      });
    }

    if (conversation_between_sender_and_recipient_index >= 0) {
      const { messages } = has_chat_for_sender.chats[
        conversation_between_sender_and_recipient_index
      ];

      messages.push({
        action: 'SENT',
        message,
      });

      has_chat_for_sender.chats[
        conversation_between_sender_and_recipient_index
      ].messages = messages;
    } else {
      has_chat_for_sender.chats.push({
        user_id: send_to,
        messages: [
          {
            action: 'SENT',
            message,
          },
        ],
      });
    }

    await this.chatRepository.save(has_chat_for_recipient);
    await this.chatRepository.save(has_chat_for_sender);
  }
}
