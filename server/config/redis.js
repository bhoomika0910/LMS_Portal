import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';

export const redisClient = createClient({ url: redisUrl, password: process.env.REDIS_PASSWORD ?? undefined });

redisClient.on('error', (err) => console.error('Redis error', err));
