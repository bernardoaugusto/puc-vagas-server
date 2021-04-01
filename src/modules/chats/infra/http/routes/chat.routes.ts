import { Router, Request, Response } from 'express';

import ChatController from '../controllers/ChatController';

const chatController = new ChatController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({ bateu: true });
});

router.post('/send/:id', chatController.sendMessage);

export default router;
