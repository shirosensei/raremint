import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NFT Minting API',
      version: '1.0.0',
    },
  },
  apis: ['./app.js'],
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use('/api-docs', serve, setup(specs));
};