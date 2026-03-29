import 'dotenv/config';
import http from 'node:http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { Server as SocketIOServer } from 'socket.io';
import { connectDB } from './config/db.js';
import { redisClient } from './config/redis.js';
import { configureSockets } from './config/socket.js';
import router from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: (process.env.CORS_WHITELIST ?? '').split(',').map((url) => url.trim()),
    credentials: true,
  },
});

configureSockets(io);

const corsOptions = {
  origin: (process.env.CORS_WHITELIST ?? '').split(',').map((url) => url.trim()),
  credentials: true,
};

app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(globalLimiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV ?? 'development' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use('/api', router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  await connectDB();
  await redisClient.connect().catch((err) => console.error('Redis error', err));
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

bootstrap().catch((err) => {
  console.error('Startup error', err);
  process.exit(1);
});
