import { createLogger, format, transports } from 'winston';

// Create a logger instance
const logger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          ({ level, message, timestamp }) =>
            `${timestamp} - ${level}: ${message}`,
        ),
      ),
    }),
    new transports.File({ filename: 'app.log' }),
  ],
  defaultMeta: { service: 'express' },
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({ filename: 'exceptions.log' }),
  ],
  rejectionHandlers: [
    new transports.Console(),
    new transports.File({ filename: 'rejections.log' }),
  ],
});

export default logger;
