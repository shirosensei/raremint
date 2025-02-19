import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { NFTRouter } from './api/routes/nftRoutes.js';
import { errorHandler } from './api/middleware/errorHandler.js';
import  logger from './api/utils/logger.js';
import { connectDB } from './api/config/database.js';


const app = express();

// Connect to MongoDB
connectDB();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(helmet()); // Security headers
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
// app.use(morgan('dev'));
app.use(cors());
app.use(errorHandler);

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'NFT Minting API',
        version: '1.0.0',
        description: 'API for storing and retrieving NFT metadata',
      },
    },
    apis: ['./routes/*.js'], // Path to the API routes
  };

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Routes
app.use('/api/nft', NFTRouter);

// Error handling
app.use(errorHandler);


  // Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running! Let's catch it on port ${process.env.PORT}`);
  });