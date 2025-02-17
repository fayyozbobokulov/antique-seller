import { logger } from '../../utils/logger';
import { Message } from '../../types/ai.types';
import { aiFactory } from './ai.factory';

class InternalAIService {
    async generateAntiqueDescription(name: string, condition: string): Promise<string> {
        try {
            const messages: Message[] = [
                {
                    role: 'system',
                    content: 'You are an expert antique appraiser. Provide detailed, accurate descriptions of antiques.'
                },
                {
                    role: 'user',
                    content: `Please provide a detailed description for an antique ${name} in ${condition} condition.`
                }
            ];

            const response = await aiFactory.getService().chat(messages);
            return response.content;
        } catch (error) {
            logger.error('Error generating antique description:', error);
            throw error;
        }
    }

    async generateAntiqueImage(description: string): Promise<string> {
        try {
            const prompt = `A high-quality, detailed photograph of an antique: ${description}`;
            const response = await aiFactory.getService().generateImage(prompt);
            return response.url;
        } catch (error) {
            logger.error('Error generating antique image:', error);
            throw error;
        }
    }

    async suggestPrice(description: string, condition: string): Promise<string> {
        try {
            const messages: Message[] = [
                {
                    role: 'system',
                    content: 'You are an expert antique appraiser. Provide price estimates for antiques based on their description and condition.'
                },
                {
                    role: 'user',
                    content: `Please suggest a price range for this antique:\nDescription: ${description}\nCondition: ${condition}`
                }
            ];

            const response = await aiFactory.getService().chat(messages);
            return response.content;
        } catch (error) {
            logger.error('Error suggesting price:', error);
            throw error;
        }
    }
}

export const internalAIService = new InternalAIService();
