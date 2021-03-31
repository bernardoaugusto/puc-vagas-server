import { Router } from 'express';

import ChatController from '../controllers/ChatController';

const chatController = new ChatController();

const router = Router();

router.post('/send/:id', chatController.sendMessage);

export default router;
