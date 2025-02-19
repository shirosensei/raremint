import request from 'supertest';
import app from '../../src/app';
import { connectTestDB, closeTestDB, clearTestDB } from '../db';

describe('NFT API Endpoints', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  const validPayload = {
    nftId: 456,
    name: 'API Test NFT',
    walletAddress: '0xC0ffee254729296a45a3885639AC7E10F9d54979'
  };

  test('POST /api/nft should create NFT', async () => {
    const res = await request(app)
      .post('/api/nft')
      .send(validPayload);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('nftId', validPayload.nftId);
  });

  test('GET /api/nft/:id should return 404 for non-existent NFT', async () => {
    const res = await request(app).get('/api/nft/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/nft should validate input', async () => {
    const res = await request(app)
      .post('/api/nft')
      .send({ ...validPayload, walletAddress: 'invalid' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });
});