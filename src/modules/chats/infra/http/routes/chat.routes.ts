import { Router } from 'express';

import ChatController from '../controllers/ChatController';

const chatController = new ChatController();

const router = Router();

router.post('/send/:id', chatController.sendMessage);
router.get('/my-chats', chatController.getChats);

export default router;
