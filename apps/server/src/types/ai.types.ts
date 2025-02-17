export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface ChatResponse {
    content: string;
    role: string;
}

export interface ImageGenerationResponse {
    url: string;
}

export interface AIServiceConfig {
    apiKey: string;
    model?: string;
}

export interface AIService {
    chat(messages: Message[]): Promise<ChatResponse>;
    generateImage(prompt: string): Promise<ImageGenerationResponse>;
}
