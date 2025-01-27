import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';

const PORT = process.env.PORT ?? 3000;

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

const app: Express = express();

// Middleware to enable CORS and parse JSON bodies
app.use(morgan('common'));
app.use(cors({ origin: '*' }));
app.use(express.json());

// Define your routes here
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
