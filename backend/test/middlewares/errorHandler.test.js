import request from 'supertest';
import app from '../../src/app';

describe('Error Handling Middleware', () => {
  test('should return 404 for unknown endpoint', async () => {
    const res = await request(app).get('/non-existent-endpoint');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toMatchObject({
      success: false,
      error: 'Endpoint not found'
    });
  });

  test('should handle service errors', async () => {
    // Trigger an error by creating duplicate NFT
    const payload = {
      nftId: 789,
      name: 'Duplicate Test',
      walletAddress: '0xC0ffee254729296a45a3885639AC7E10F9d54979'
    };
    
    await request(app).post('/api/nft').send(payload);
    const res = await request(app).post('/api/nft').send(payload);
    
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('error');
  });
});