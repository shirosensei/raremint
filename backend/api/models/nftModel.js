import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema({
    nftId: {
        type: Number,
        required: true,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
        require: true,
    },
    logoUrl: {
        type: String,
        validate: {
            validator: v =>  /^(https?|ipfs):\/\/.+/i.test(v),
            message: 'Invalid URL format',
        },
        required: true,
      },
      userWalletAddress: {
        type: String,
        required: true,
        validate: {
          validator: v => /^0x[a-fA-F0-9]{40}$/i.test(v),
          message: 'Invalid Ethereum wallet address format',
        },
      }
}, { timestamps: true });

export const NFT = mongoose.model('NFT', NFTSchema);