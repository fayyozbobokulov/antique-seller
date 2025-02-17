import { Application, Router } from 'express';
import { sseController } from '../controllers/sse.controller';

export const configureRoutes = (app: Application): void => {
  const apiRouter = Router();

  // SSE endpoint
  apiRouter.get('/events', sseController.subscribe);

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
