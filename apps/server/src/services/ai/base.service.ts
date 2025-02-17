import { AIService, AIServiceConfig, ChatResponse, ImageGenerationResponse, Message } from '../../types/ai.types';

export abstract class BaseAIService implements AIService {
    protected config: AIServiceConfig;

    constructor(config: AIServiceConfig) {
        this.config = config;
    }

    abstract chat(messages: Message[]): Promise<ChatResponse>;
    abstract generateImage(prompt: string): Promise<ImageGenerationResponse>;
}
