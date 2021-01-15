import { saveCustomHashedUrl } from '../../services/hashService';
import Logger from '../../utils/logger';
import type { Request, Response, NextFunction } from 'express';

export default async function postCustomizedHashedUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const url: string = req.body?.url;
    const customText: string = req.body?.customText;
    const size: number = req.body?.size;
    const baseRoute: string = `${req.headers.host}${req.baseUrl}/tinyurl` ?? '';
    const response = await saveCustomHashedUrl(url, customText, baseRoute, size);
    res.status(200).send(response);
  } catch (err) {
    Logger.error('postCustomizedHashedUrl', err.stack);
    next(err);
  }
}
