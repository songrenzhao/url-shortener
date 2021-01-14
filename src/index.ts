import createApp from './app';
import config from './config';
import Logger from './utils/logger';
import type { ILogger } from './utils/logger';
import type { Application } from 'express';

const Log: ILogger = new Logger();
const app: Application = createApp();

app.listen(config.port, (): void => {
  Log.info(`Server running on port ${config.port}`);
});
