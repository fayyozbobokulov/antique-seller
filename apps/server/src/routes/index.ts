import { Application, Router, Request, Response } from 'express';
import { sseController } from '../controllers/sse.controller';
import { Message } from '../types/message';
import { v4 as uuidv4 } from 'uuid';

export const configureRoutes = (app: Application): void => {
  const apiRouter = Router();

  // SSE endpoint for real-time updates
  apiRouter.get('/events', sseController.subscribe);

  // Message endpoint to send new messages
  apiRouter.post('/message', async (req: Request, res: Response) => {
    const { content, conversationId = uuidv4() } = req.body;
    
    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      author: { role: 'user' },
      create_time: Date.now()
    };

    // Stream user message
    await sseController.streamMessage(conversationId, userMessage);

    // Simulate assistant response
    const assistantMessage: Message = {
      id: uuidv4(),
      content: `This is a simulated response to: ${content}`,
      author: { role: 'assistant' },
      create_time: Date.now()
    };

    // Stream assistant message
    await sseController.streamMessage(conversationId, assistantMessage);

    res.json({ status: 'ok', conversationId });
  });

  // Health check endpoint
  apiRouter.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      connectedClients: sseController.getConnectedClients()
    });
  });

  // Mount API routes
  app.use('/api', apiRouter);
};
