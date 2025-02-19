import mongoose from "mongoose";
import  logger from "../utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';


const MONGO_URI =  isProduction ? process.env.MONGO_URI : process.env.MONGO_URI ;


export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info(`✅ Connection Established! Let's get it!`);
    } catch (error) {
        logger.error('❌ Database connection error:', { stack: error.stack || error.message });
        process.exit(1);
    }
}