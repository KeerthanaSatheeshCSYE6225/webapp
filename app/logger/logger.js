import winston from 'winston';

// Create the logger
const logger = winston.createLogger({
  level:'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

// Log an informational message
logger.log('info', 'This is an informational message.');

// Log an error message
logger.log('error', 'This is an error message.');

// Export the logger
export default logger;