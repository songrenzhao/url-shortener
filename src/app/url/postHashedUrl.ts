import { saveHashedUrl } from '../../services/hashService';
import Logger from '../../utils/logger';
import type { Request, Response, NextFunction } from 'express';

export default async function postHashedUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const url: string = req.body?.url;
    const baseRoute: string = `${req.headers.host}${req.baseUrl}/tinyurl` ?? '';
    const response = await saveHashedUrl(url, baseRoute);
    res.status(200).send(response);
  } catch (err) {
    Logger.error('postHashedUrl', err.stack);
    next(err);
  }
}
