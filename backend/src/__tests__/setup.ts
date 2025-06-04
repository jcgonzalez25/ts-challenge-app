/**
 * Global Test Setup Configuration
 * 
 * This file configures the testing environment for all Jest tests.
 * It sets up mocks for external dependencies to ensure tests are:
 * - Fast (no real database connections)
 * - Reliable (no external service dependencies)
 * - Isolated (no side effects between tests)
 * 
 * The setup runs before each test suite, providing a clean environment
 * with all external dependencies properly mocked.
 * 
 * @category Test Configuration
 */

/**
 * Mock Database Configuration
 * 
 * Mocks the database configuration module to prevent real database connections
 * during testing. Returns mock functions that can be controlled in individual tests.
 * 
 * Mock Structure:
 * - getDb(): Returns a mock database instance with chainable query methods
 * - initializeDatabase(): Returns resolved promise for app startup tests
 * - closeDatabase(): Returns resolved promise for cleanup tests
 */
jest.mock('../config/database.config', () => ({
  getDb: jest.fn(() => {
    /**
     * Mock Query Builder
     * 
     * Simulates Knex query builder pattern where methods can be chained.
     * Each method returns 'this' to support method chaining like:
     * db('table').select('*').where('id', 1).first()
     */
    const mockQuery = {
      // Selection methods
      select: jest.fn().mockReturnThis(),
      
      // Modification methods
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      
      // Query building methods
      where: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      table: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      
      // Execution methods (these should be mocked to return actual values)
      first: jest.fn(),
      returning: jest.fn().mockReturnThis(),
      
      // Raw query method
      raw: jest.fn(),
    };
    
    /**
     * Database Function Mock
     * 
     * Returns a function that accepts a table name and returns the mock query object.
     * This simulates the Knex pattern: knex('table_name')
     */
    return jest.fn(() => mockQuery);
  }),
  
  /**
   * Database Initialization Mock
   * 
   * Mocks the database initialization function to return a resolved promise.
   * This prevents actual database connection attempts during testing.
   */
  initializeDatabase: jest.fn().mockResolvedValue(true),
  
  /**
   * Database Cleanup Mock
   * 
   * Mocks the database cleanup function for testing graceful shutdowns.
   */
  closeDatabase: jest.fn().mockResolvedValue(undefined),
}));

/**
 * Mock Knex Instance (Fallback)
 * 
 * Provides a fallback mock for any direct Knex imports that might bypass
 * the database configuration module. This ensures comprehensive mocking
 * coverage throughout the application.
 */
jest.mock('knex', () => {
  const mockKnex = {
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    table: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    first: jest.fn(),
    returning: jest.fn().mockReturnThis(),
    raw: jest.fn(),
  };
  
  return jest.fn(() => mockKnex);
});

/**
 * Test Environment Configuration
 * 
 * Sets up environment variables specifically for testing to ensure:
 * - Tests run in test mode
 * - Different port to avoid conflicts
 * - Consistent environment across all tests
 */
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

/**
 * Global Test Timeout
 * 
 * Sets a reasonable timeout for all tests to prevent hanging tests
 * from blocking the test suite. Individual tests can override this
 * if they need more time for specific operations.
 */
jest.setTimeout(10000); 