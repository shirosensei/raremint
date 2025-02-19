import { createNFT, getNFTById } from '../../src/services/nftService';
import NFT from '../../src/models/NFT';

describe('NFT Service', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  test('createNFT should create new NFT', async () => {
    const nftData = {
      nftId: 1,
      name: 'Service Test',
      walletAddress: '0xC0ffee254729296a45a3885639AC7E10F9d54979'
    };
    
    const result = await createNFT(nftData);
    expect(result).toHaveProperty('_id');
    expect(result.name).toBe(nftData.name);
  });

  test('getNFTById should throw error for non-existent NFT', async () => {
    await expect(getNFTById(999)).rejects.toThrow('NFT not found');
  });
});