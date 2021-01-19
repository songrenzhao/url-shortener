import { nanoid, customAlphabet } from 'nanoid';
import { createTinyUrl, findTinyUrl } from './urlService';
import { getCachedUrl, cacheUrl } from '../services/cacheService';
import Logger from '../utils/logger';
import type { tinyUrl } from './urlService';

/**
 * Return unique nano id generated by nanoid package
 * @param url 
 * @param baseRoute 
 * @param customText 
 * @param size 
 */
async function getUniqNanoId(url: string, baseRoute: string, customText?: string, size?: number): Promise<string> {
  let hashedValue;
  do {
    if (customText) {
      const customizedNanoid = customAlphabet(customText, size ?? 10); 
      hashedValue = await customizedNanoid();
    } else {
      hashedValue = await nanoid();
    }
    const tinyUrl: tinyUrl = await findTinyUrl(hashedValue);
    if (!tinyUrl) break;
  } while (true);
  return hashedValue;
}

/**
 * Return original url if found, return {} otherwise
 * @param hashedValue 
 */
export async function getOriginalUrl(hashedValue: string): Promise<tinyUrl> {
  const response: tinyUrl = {};
  const getRawCachedUrl: string | undefined = await getCachedUrl(hashedValue);
  if (getRawCachedUrl) {
    const cacheUrl: tinyUrl = JSON.parse(getRawCachedUrl);
    Object.assign(response, cacheUrl);
  } else {
    const info: tinyUrl = await findTinyUrl(hashedValue);
    Object.assign(response, info);
  }
  return response ?? {};
}

/**
 * Saved hashed url depending on whether it is a customized nanoid or regular nanoid,
 * return once completed
 * @param url 
 * @param baseRoute 
 * @param customText 
 * @param size 
 */
export async function saveHashedUrl(url: string, baseRoute: string, customText?: string, size?: number): Promise<tinyUrl> {
  const hashedValue: string = await getUniqNanoId(url, baseRoute, customText, size);
  const isUrlCreated: boolean = await createTinyUrl(hashedValue, url);
  const tinyUrl: tinyUrl = isUrlCreated ? await findTinyUrl(hashedValue) : {};
  const isCachedSuccessfully: boolean = await cacheUrl(hashedValue, tinyUrl);
  if (!isCachedSuccessfully) {
    Logger.warning(`Redis did not cached key ${hashedValue} at ${`new Date()`}`)
  }
  return {
    hashedValues: tinyUrl?.hashedValues,
    originalURL: tinyUrl?.originalURL,
    creationDate: tinyUrl?.creationDate,
    expirationDate: tinyUrl?.expirationDate,
    baseRoute: `${baseRoute}/${tinyUrl?.hashedValues}`
  }
}
