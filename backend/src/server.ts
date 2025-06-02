import { initializeDatabase } from 'config/database.config';
import { createApp } from './app';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initializeDatabase()

    // Create and start Express app
    const app = createApp();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
