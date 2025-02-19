import winston from 'winston';


const { combine, timestamp, printf, colorize, json, simple } = winston.format;


const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});



const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: combine(timestamp(), json()),
    
   
    defaultMeta: { service: 'nft-minting-api' },
    transports: [
        new winston.transports.Console({
            format: process.env.NODE_ENV === 'production' 
            ? combine(timestamp(), simple()) 
            :  combine(colorize(), timestamp(), logFormat)
            
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log', format: logFormat })
    ]
});


// If not in production, log to the console
if (process.env.NODE_ENV !== 'production') {
    logger.debug('Winston logger initialized in development mode');
}

export default logger;