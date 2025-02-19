import NFT from '../../src/models/NFT';

describe('NFT Model', () => {
  const validNFT = {
    nftId: 123,
    name: 'Test NFT',
    walletAddress: '0xC0ffee254729296a45a3885639AC7E10F9d54979'
  };

  test('should create valid NFT', async () => {
    const nft = new NFT(validNFT);
    const savedNFT = await nft.save();
    expect(savedNFT._id).toBeDefined();
    expect(savedNFT.name).toBe(validNFT.name);
  });

  test('should require nftId', async () => {
    const nft = new NFT({ ...validNFT, nftId: undefined });
    await expect(nft.save()).rejects.toThrow('NFT validation failed: nftId: Path `nftId` is required');
  });

  test('should reject invalid wallet address', async () => {
    const nft = new NFT({ ...validNFT, walletAddress: 'invalid-address' });
    await expect(nft.save()).rejects.toThrow(/Invalid wallet address/);
  });
});