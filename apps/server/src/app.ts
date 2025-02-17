import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from './middleware/errorHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { configureRoutes } from './routes';
import { logger } from './utils/logger';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.errorHandling();
  }

  private middleware(): void {
    // Security middleware
    this.express.use(helmet());
    
    // CORS configuration
    this.express.use(cors({
      origin: process.env.CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    // Request parsing
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    
    // Compression
    this.express.use(compression());

    // Logging
    this.express.use((req, res, next) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });
  }

  private routes(): void {
    configureRoutes(this.express);
  }

  private errorHandling(): void {
    this.express.use(routeNotFound);
    this.express.use(errorHandler);
  }
}

export default new App().express;
