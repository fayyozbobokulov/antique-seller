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
    this.logRegisteredRoutes();
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

  private logRegisteredRoutes(): void {
    if (!this.express._router) {
      logger.warn('No routes have been registered yet');
      return;
    }

    const routes: { path: string; methods: string[] }[] = [];
    this.express._router.stack.forEach((middleware: any) => {
      if (middleware.name === 'router') {
        // This is the /api router
        const routerStack = middleware.handle.stack;
        routerStack.forEach((handler: any) => {
          if (handler.route) {
            const path = '/api' + handler.route.path;
            const methods = Object.keys(handler.route.methods)
              .filter(method => handler.route.methods[method])
              .map(method => method.toUpperCase());
            routes.push({ path, methods });
          }
        });
      } else if (middleware.route) {
        const path = middleware.route.path;
        const methods = Object.keys(middleware.route.methods)
          .filter(method => middleware.route.methods[method])
          .map(method => method.toUpperCase());
        routes.push({ path, methods });
      }
    });

    logger.info('Registered Routes:');
    routes.forEach(route => {
      logger.info(`${route.methods.join(', ')}\t${route.path}`);
    });
  }

  private errorHandling(): void {
    this.express.use(routeNotFound);
    this.express.use(errorHandler);
  }
}

export default new App().express;
