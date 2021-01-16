import TinyUrl from '../models/urls';
import type { IUrl } from '../models/urls';

export type tinyUrl = {
  hashedValues?: string;
  originalURL?: string,
  creationDate?: Date,
  expirationDate?: Date
  baseRoute?: string
} | null;

/**
 * Create a mapping in database hashedValues <=> originalUrl
 * @param hashedValues 
 * @param originalURL 
 */
export async function createTinyUrl(hashedValues: string, originalURL: string): Promise<boolean> {
  const tinyurl: IUrl = new TinyUrl({
    hashedValues,
    originalURL,
    creationDate: new Date(),
    expirationDate: new Date((new Date()).getTime() + (1 * 24 * 60 * 60 * 1000))
  });
  const response = await tinyurl.save();
  return !!response;
}

/**
 * Return the mapping entry from database
 * @param hashedValues 
 */
export async function findTinyUrl(hashedValues: string): Promise<tinyUrl> {
  const tinyUrl: Array<IUrl> = await TinyUrl.find({ hashedValues });
  const response = tinyUrl.length !== 0 ? tinyUrl[0] : null;
  return response;
}

/**
 * Remove all mappings found for a given hashedValue
 * @param hashedValues 
 */
export async function removeTinyUrl(hashedValues: string): Promise<boolean> {
  const { ok: response }: { ok: number } = await TinyUrl.deleteMany({ hashedValues });
  return !!response;
}
