import { body, validationResult } from 'express-validator';

// Validate NFT data
export const validateNFTData = [
    body('nftId').isNumeric().withMessage('NFT ID must be a number'),
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('logoUrl').isURL().withMessage('Invalid logo URL format'),
    body('userWalletAddress')
        .matches(/^0x[a-fA-F0-9]{40}$/)
        .withMessage('Invalid wallet address format'),
 (req, res, next) => {
    
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    next();
    }
];