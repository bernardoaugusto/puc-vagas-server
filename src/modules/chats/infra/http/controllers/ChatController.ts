import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendMessageService from '@modules/chats/services/SendMessageService';

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
      request.io
        .to(user_data.client_id)
        .emit('new_message', { from: send_by, message });

    return response.status(201).json({ send: true });
  }
}