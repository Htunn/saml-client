import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const networkLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    // Log incoming request
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    logger.info(`Headers: ${JSON.stringify(req.headers)}`);
    logger.info(`Body: ${JSON.stringify(req.body)}`);

    // Capture the original send function
    const originalSend = res.send;

    // Override the send function to log the response
    res.send = function (body?: any): Response {
        const duration = Date.now() - start;
        logger.info(`Response status: ${res.statusCode}`);
        logger.info(`Response body: ${body}`);
        logger.info(`Request duration: ${duration}ms`);
        return originalSend.call(this, body);
    };

    next();
};

export default networkLogger;