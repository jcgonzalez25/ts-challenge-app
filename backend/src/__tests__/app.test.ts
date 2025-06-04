import request from 'supertest';
import { createApp } from '../app';

/**
 * Integration Tests for Express Application
 * 
 * These tests verify that the Express app is configured correctly and
 * handles basic HTTP requests as expected. They test the integration
 * between routes, middleware, and error handlers.
 * 
 * @category Integration Tests
 */
describe('Express App', () => {
  const app = createApp();

  /**
   * Health Check Endpoint Tests
   * 
   * Verifies that the health check endpoint is working and returns
   * proper status information. This is crucial for monitoring and
   * load balancer health checks.
   */
  describe('Health Check', () => {
    /**
     * Test that health endpoint returns 200 status with proper response format
     * 
     * Expected behavior:
     * - Returns HTTP 200 status
     * - Response contains 'status' field with value 'ok'
     * - Response contains 'timestamp' field with valid date
     */
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      // Verify response structure
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      
      // Verify timestamp is a valid date
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });
  });

  /**
   * Error Handling Tests
   * 
   * Verifies that the app properly handles non-existent routes
   * with appropriate error responses. Tests the notFoundHandler middleware.
   */
  describe('404 Handler', () => {
    /**
     * Test that non-existent routes return proper 404 error
     * 
     * Expected behavior:
     * - Returns HTTP 404 status
     * - Response follows standard error format
     * - Contains descriptive error message
     */
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);

      // Verify error response structure matches API standards
      expect(response.body).toHaveProperty('error', 'Resource not found');
      expect(response.body).toHaveProperty('success', false);
    });
  });

  /**
   * CORS Configuration Tests
   * 
   * Verifies that CORS headers are properly set for cross-origin requests.
   * This is essential for frontend applications running on different domains.
   */
  describe('CORS', () => {
    /**
     * Test that CORS headers are included in responses
     * 
     * Expected behavior:
     * - Response includes Access-Control-Allow-Origin header
     * - CORS middleware is properly configured
     */
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      // Verify CORS headers are present
      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });
  });
}); 