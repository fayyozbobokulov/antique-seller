export type MessageRole = 'seller' | 'client';

export interface Attachment {
  id: string;
  file: File;
  previewUrl: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
}
