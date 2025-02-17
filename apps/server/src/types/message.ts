export interface Message {
  id: string;
  author: {
    role: 'user' | 'assistant' | 'system';
    name?: string;
  };
  content: string;
  create_time: number;
}

export interface MessageDelta {
  type: 'delta_encoding' | 'message' | 'done';
  conversation_id: string;
  data?: {
    message?: {
      id: string;
      author?: {
        role: 'user' | 'assistant' | 'system';
        name?: string;
      };
      content?: string;
    };
    delta?: {
      content?: string;
      author?: {
        role: 'user' | 'assistant' | 'system';
      };
    };
  };
}

export interface ConversationMetadata {
  conversation_id: string;
  title?: string;
  create_time: number;
  update_time: number;
}
