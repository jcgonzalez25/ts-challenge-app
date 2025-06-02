import knex, { Knex } from 'knex';
import knexConfig from '../db/knexfile';

let db: Knex | null = null;

export const getDb = (): Knex => {
  if (!db) {
    const environment = process.env.NODE_ENV || 'development';
    const config = knexConfig[environment];
    db = knex(config);
  }
  return db;
};

export const initializeDatabase = async (): Promise<Knex> => {
  const database = getDb();
  
  // Test the connection
  try {
    await database.raw('SELECT 1');
    console.log('Database connection established successfully');
    return database;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export const closeDatabase = async (): Promise<void> => {
  if (db) {
    await db.destroy();
    db = null;
  }
};