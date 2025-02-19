import Router from 'express';
import { NFTController } from '../controllers/nftController.js';
import { validateNFTData } from '../middleware/validationMiddleware.js';

export const NFTRouter = Router();


/**
 * @swagger
 * /api/nft/store:
 *   post:
 *     summary: Store NFT data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nftId
 *               - name
 *               - description
 *               - logoUrl
 *               - userWalletAddress
 *             properties:
 *               nftId:
 *                 type: number
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *               userWalletAddress:
 *                 type: string
 */
NFTRouter.post('/store', validateNFTData, NFTController.storeNFT);

/**
 * @swagger
 * /api/nft/{nftId}:
 *   get:
 *     summary: Get NFT data by ID
 *     parameters:
 *       - in: path
 *         name: nftId
 *         required: true
 *         schema:
 *           type: number
 */
NFTRouter.get('/:nftId', NFTController.getNFTById);

/**
 * @swagger
 * /api/nft/gallery/{userWalletAddress}:
 *   get:
 *     summary: Get NFT gallery by user wallet address
 *     parameters:
 *       - in: path
 *         name: userWalletAddress
 *         required: true
 *         schema:
 *           type: string
 */
NFTRouter.get('/gallery/:userWalletAddress', NFTController.getNFTGallery);
