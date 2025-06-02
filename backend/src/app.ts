import express, { Application } from 'express';
import cors from 'cors';
import studentRoutes from './routes/student.routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

export const createApp = (): Application => {
  const app = express();

  // CORS configuration
  app.use(cors());

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  app.use('/api/students', studentRoutes);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};