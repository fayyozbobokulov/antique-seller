import { AIService } from '../../types/ai.types';
import { OpenAIService } from './openai.service';

export type AIProvider = 'openai' | 'other-future-provider';

export class AIFactory {
    private static instance: AIFactory;
    private services: Map<AIProvider, AIService>;

    private constructor() {
        this.services = new Map();
        // Initialize default services
        this.services.set('openai', new OpenAIService());
    }

    public static getInstance(): AIFactory {
        if (!AIFactory.instance) {
            AIFactory.instance = new AIFactory();
        }
        return AIFactory.instance;
    }

    public getService(provider: AIProvider = 'openai'): AIService {
        const service = this.services.get(provider);
        if (!service) {
            throw new Error(`AI service provider '${provider}' not found`);
        }
        return service;
    }

    public registerService(provider: AIProvider, service: AIService): void {
        this.services.set(provider, service);
    }
}

// Export a singleton instance
export const aiFactory = AIFactory.getInstance();
