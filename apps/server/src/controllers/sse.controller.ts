import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { Message, MessageDelta, ConversationMetadata } from '../types/message';
import { v4 as uuidv4 } from 'uuid';

export class SSEController {
  private clients: Map<string, Response> = new Map();
  private conversations: Map<string, ConversationMetadata> = new Map();

  public subscribe = (req: Request, res: Response): void => {
    const clientId = uuidv4();
    const conversationId = req.query.conversationId as string || uuidv4();

    // SSE Headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store',
      'Connection': 'keep-alive',
    });

    // Send initial connection message
    this.sendDelta(res, {
      type: 'delta_encoding',
      conversation_id: conversationId,
      data: {
        message: {
          id: uuidv4(),
          author: { role: 'system' },
          content: 'Connection established'
        }
      }
    });

    // Add client to the map
    this.clients.set(clientId, res);
    logger.info(`Client ${clientId} connected to conversation ${conversationId}`);

    // Initialize conversation if new
    if (!this.conversations.has(conversationId)) {
      this.conversations.set(conversationId, {
        conversation_id: conversationId,
        create_time: Date.now(),
        update_time: Date.now()
      });
    }

    // Remove client when connection is closed
    req.on('close', () => {
      this.clients.delete(clientId);
      logger.info(`Client ${clientId} disconnected from conversation ${conversationId}`);
    });
  };

  private sendDelta = (res: Response, delta: MessageDelta): void => {
    res.write(`data: ${JSON.stringify(delta)}\n\n`);
  };

  public streamMessage = async (conversationId: string, message: Message): Promise<void> => {
    const words = message.content.split(' ');
    const clients = Array.from(this.clients.values());

    // Send message start
    clients.forEach(client => {
      this.sendDelta(client, {
        type: 'message',
        conversation_id: conversationId,
        data: {
          message: {
            id: message.id,
            author: message.author
          }
        }
      });
    });

    // Stream content word by word
    for (const word of words) {
      await new Promise(resolve => setTimeout(resolve, 50)); // Simulate typing delay
      clients.forEach(client => {
        this.sendDelta(client, {
          type: 'delta_encoding',
          conversation_id: conversationId,
          data: {
            delta: {
              content: word + ' '
            }
          }
        });
      });
    }

    // Send message complete
    clients.forEach(client => {
      this.sendDelta(client, {
        type: 'done',
        conversation_id: conversationId,
        data: {
          message: {
            id: message.id,
            content: message.content
          }
        }
      });
    });

    // Update conversation metadata
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.update_time = Date.now();
      if (!conversation.title && message.author.role === 'user') {
        conversation.title = message.content.slice(0, 50) + '...';
      }
    }
  };

  public getConnectedClients = (): number => {
    return this.clients.size;
  };
}

export const sseController = new SSEController();
