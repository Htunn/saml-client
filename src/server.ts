import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import logger from './config/logger';
import samlRoutes from './routes/samlRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import networkLogger from './config/networkLogger'; // Import the network logger middleware

dotenv.config();

// Load the OpenAPI specification
const swaggerDocument = YAML.load('./src/openapi/api_specification.yml');

const app = express();

// Disable the x-powered-by header
app.disable("x-powered-by");
const port = process.env.PORT || 3005;

// Define CORS options
let corsOptions = {
  origin: process.env.CORS_ORIGIN || 'localhost' // Get origin from environment variable or use default value
};

// Enable CORS for all routes with specified options
app.use(cors(corsOptions));

// Use the network logger middleware
app.use(networkLogger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve the API documentation using Swagger UI
app.use('/openapi', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Apply middleware and routes
app.use('/', samlRoutes);
app.use('/saml', samlRoutes);

export function startServer() {
  try {
    const server = app.listen(port, () => {
      logger.log({ level: 'info', message: `Server running on port ${port}` });
      console.log(`SAML app listening at ${port}`);
      console.log(`API documentation available at ${port}/openapi`);
    });

    // Handle server errors
    server.on('error', (error) => {
      logger.error('Server error:', error);
      setTimeout(startServer, 5000);
    });

    // Export the server for testing purposes
    module.exports.server = server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    setTimeout(startServer, 5000);
  }
}

// Start the server
startServer();