import { Request, Response } from 'express';
import { openAIService } from '../services/openai.service';
import { logger } from '../utils/logger';

export class OpenAIController {
    async chat(req: Request, res: Response) {
        try {
            const { messages } = req.body;

            if (!Array.isArray(messages) || messages.length === 0) {
                return res.status(400).json({ error: 'Messages array is required' });
            }

            const response = await openAIService.chat(messages);
            return res.json({ response });
        } catch (error) {
            logger.error('Error in chat controller:', error);
            return res.status(500).json({ error: 'Failed to process chat request' });
        }
    }

    async generateImage(req: Request, res: Response) {
        try {
            const { prompt } = req.body;

            if (!prompt || typeof prompt !== 'string') {
                return res.status(400).json({ error: 'Prompt is required' });
            }

            const imageUrl = await openAIService.generateImage(prompt);
            return res.json({ imageUrl });
        } catch (error) {
            logger.error('Error in image generation controller:', error);
            return res.status(500).json({ error: 'Failed to generate image' });
        }
    }
}

export const openAIController = new OpenAIController();
