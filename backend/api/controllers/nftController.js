import { NFT } from '../models/nftModel.js';
import logger from '../utils/logger.js';


export class NFTController {
    static async storeNFT(req, res, next) {
        try {
            const nft = new NFT(req.body);
            await nft.save();
            res.status(201).json({ message: 'NFT stored successfully', nft });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: error.message });
            }

            // Log error
            logger.error(`Error storing NFT: ${error.message}`, { stack: error.stack || error.message });

            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getNFTById(req, res, next) {
        try {

            const nftId = Number(req.params.nftId);

            if (isNaN(nftId)) {
                return res.status(404).json({ message: 'Invalid NFT ID format' });
            }

            const nft = await NFT.findOne({ nftId });

            if (!nft) {
                return res.status(404).json({ message: 'NFT not found' });
            }

            res.status(200).json(nft);
        } catch (error) {
            logger.error(`Error getting NFT by ID: ${error.message}`, { stack: error.stack || error.message });  
            next(error);
        }
    }

    static async getNFTGallery(req, res, next) {
        try {

            const userWalletAddress = req.params.userWalletAddress;

            if(userWalletAddress.length !== 42 || !userWalletAddress || !userWalletAddress.startsWith('0x')) {
                return res.status(400).json({ message: 'Invalid user wallet address format' });
            }

            const nfts = await NFT.find({ userWalletAddress });

            if (!nfts || nfts.length === 0) {
                return res.status(404).json({ message: 'NFTs not found' });
            }

           res.status(200).json(nfts);
        } catch (error) {
            logger.error(`Error getting NFT gallery: ${error.message}`, { stack: error.stack || error.message });
            next(error);
        }
    }
}