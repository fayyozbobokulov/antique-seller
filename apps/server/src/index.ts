import 'dotenv/config';
import app from './app';
import { logger } from './utils/logger';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  server.close(() => {
    logger.info('Server closed.');
    process.exit(0);
  });
});

export default server;
