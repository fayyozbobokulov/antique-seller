import OpenAI from 'openai';
import { logger } from '../utils/logger';

class OpenAIService {
    private openai: OpenAI;

    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not set in environment variables');
        }
        this.openai = new OpenAI({
            apiKey: apiKey,
        });
    }

    async chat(messages: Array<{ role: 'system' | 'user' | 'assistant', content: string }>) {
        try {
            const completion = await this.openai.chat.completions.create({
                messages: messages,
                model: "gpt-4-turbo-preview",
            });

            return completion.choices[0].message;
        } catch (error) {
            logger.error('Error in OpenAI chat:', error);
            throw error;
        }
    }

    async generateImage(prompt: string) {
        try {
            const response = await this.openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            });

            return response.data[0].url;
        } catch (error) {
            logger.error('Error in OpenAI image generation:', error);
            throw error;
        }
    }
}

export const openAIService = new OpenAIService();
