import { Router } from 'express';
import { openAIController } from '../controllers/openai.controller';

const router = Router();

router.post('/chat', openAIController.chat);
router.post('/generate-image', openAIController.generateImage);

export const openAIRoutes = router;
