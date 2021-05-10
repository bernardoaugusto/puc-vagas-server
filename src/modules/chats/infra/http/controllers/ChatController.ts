import { Request, Response } from 'express';
import io from '@shared/infra/http/server';
import { container } from 'tsyringe';
import SendMessageService from '@modules/chats/services/SendMessageService';
import FindChatsService from '@modules/chats/services/FindChatsService';

export default class ChatController {
  public async sendMessage(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;
    const { id: send_to } = request.params;
    const { id: send_by } = request.user;

    const sendMessageService = container.resolve(SendMessageService);

    const user_data = await sendMessageService.execute({
      message,
      send_by,
      send_to,
    });

    if (user_data)
      io.to(user_data.client_id).emit('new_message', { from: send_by, message });

    return response.status(201).json({ send: true });
  }

  public async getChats(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findChatsService = container.resolve(FindChatsService);

    const chats = await findChatsService.execute(id);

    return response.status(200).send(chats);
  }
}
