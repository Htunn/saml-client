import request from 'supertest';
import { startServer } from '../src/server';
import dotenv from 'dotenv';

dotenv.config();

describe('startServer', () => {
  let server: any;

  beforeAll(() => {
    server = startServer();
  });

  afterAll(() => {
    server.close();
  });

  it('should start the server and return a success message', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });

  it('should handle server errors and restart the server', async () => {
    // Simulate a server error
    server.emit('error', new Error('Test error'));

    // Wait for the server to restart
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Send a request to check if the server has restarted
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });

  it('should have CORS enabled with correct origin', async () => {
    const response = await request(server).options('/');
    expect(response.headers['access-control-allow-origin']).toBe(process.env.CORS_ORIGIN || 'localhost');
  });

  it('should use the network logger middleware', async () => {
    // Assuming networkLogger adds a custom header for testing
    const response = await request(server).get('/');
    expect(response.headers).toHaveProperty('x-network-logger');
  });

  it('should serve the API documentation at /openapi', async () => {
    const response = await request(server).get('/openapi');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });

  it('should have SAML routes configured', async () => {
    const response = await request(server).get('/saml');
    expect(response.status).toBe(200);
  });
});