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

    console.log('message', message);
    console.log('send_by', send_by);
    console.log('send_to', send_to);
  }
}
