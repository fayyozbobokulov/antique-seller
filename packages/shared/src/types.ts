import { z } from 'zod';

// Define shared types here that both client and server will use
export const AntiqueSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string().optional(),
  createdAt: z.date(),
});

export type Antique = z.infer<typeof AntiqueSchema>;

// Message and conversation types for real-time communication
export const MessageAuthorSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  name: z.string().optional(),
});

export const MessageSchema = z.object({
  id: z.string(),
  author: MessageAuthorSchema,
  content: z.string(),
  create_time: z.number(),
});

export const MessageDeltaSchema = z.object({
  type: z.enum(['delta_encoding', 'message', 'done']),
  conversation_id: z.string(),
  data: z.object({
    message: z.object({
      id: z.string(),
      author: MessageAuthorSchema.optional(),
      content: z.string().optional(),
    }).optional(),
    delta: z.object({
      content: z.string().optional(),
      author: MessageAuthorSchema.optional(),
    }).optional(),
  }).optional(),
});

export const ConversationMetadataSchema = z.object({
  conversation_id: z.string(),
  title: z.string().optional(),
  create_time: z.number(),
  update_time: z.number(),
});

// Export inferred types
export type Message = z.infer<typeof MessageSchema>;
export type MessageDelta = z.infer<typeof MessageDeltaSchema>;
export type ConversationMetadata = z.infer<typeof ConversationMetadataSchema>;
export type MessageAuthor = z.infer<typeof MessageAuthorSchema>;
