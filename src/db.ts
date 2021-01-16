import mongoose from 'mongoose';
import config from './config';
import RedisCache from './utils/cache';
import Logger from './utils/logger';
import type { RedisOptions } from 'ioredis';

const USERNAME: string = config?.mongodb_username ?? '';
const PASSWORD: string = config?.mongodb_password ?? '';
const MISC: string = config?.mongodb_misc ?? '';
const mongoConnectionString = `mongodb+srv://${USERNAME}:${PASSWORD}@${MISC}?retryWrites=true&w=majority`;

const redisHost: string = config?.redis_host ?? 'localhost';
const redisPort: number = parseInt(config?.redis_port ?? '3000', 10);
const redisPassword: string = config?.redis_password ?? '';
const redisOptions: RedisOptions = {
  port: redisPort,
  host: redisHost,
  password: redisPassword
}

const redisCache = new RedisCache(Logger);

redisCache.connect(redisOptions);
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
