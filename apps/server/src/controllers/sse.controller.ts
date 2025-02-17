import { Request, Response } from 'express';
import { logger } from '../utils/logger';

export class SSEController {
  private clients: Set<Response> = new Set();

  public subscribe = (req: Request, res: Response): void => {
    // SSE Headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    // Send initial connection established message
    res.write(`data: ${JSON.stringify({ message: 'Connected to SSE' })}\n\n`);

    // Add client to the set
    this.clients.add(res);
    logger.info('Client connected to SSE');

    // Remove client when connection is closed
    req.on('close', () => {
      this.clients.delete(res);
      logger.info('Client disconnected from SSE');
    });
  };

  public broadcast = (data: any): void => {
    this.clients.forEach((client) => {
      client.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  };

  public getConnectedClients = (): number => {
    return this.clients.size;
  };
}

export const sseController = new SSEController();
