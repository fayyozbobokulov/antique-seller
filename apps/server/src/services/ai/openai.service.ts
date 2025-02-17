import OpenAI from 'openai';
import { logger } from '../../utils/logger';
import { BaseAIService } from './base.service';
import { ChatResponse, ImageGenerationResponse, Message } from '../../types/ai.types';

export class OpenAIService extends BaseAIService {
    private openai: OpenAI;

    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error('OPENAI_API_KEY is not set in environment variables');
        }
        super({ apiKey });
        this.openai = new OpenAI({
            apiKey: this.config.apiKey,
        });
    }

    async chat(messages: Message[]): Promise<ChatResponse> {
        try {
            const completion = await this.openai.chat.completions.create({
                messages: messages,
                model: "gpt-4-turbo-preview",
            });

            const response = completion.choices[0].message;
            return {
                content: response.content || '',
                role: response.role
            };
        } catch (error) {
            logger.error('Error in OpenAI chat:', error);
            throw error;
        }
    }

    async generateImage(prompt: string): Promise<ImageGenerationResponse> {
        try {
            const response = await this.openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            });

            return {
                url: response.data[0].url || ''
            };
        } catch (error) {
            logger.error('Error in OpenAI image generation:', error);
            throw error;
        }
    }
}
