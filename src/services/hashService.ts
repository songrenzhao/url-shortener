import { nanoid, customAlphabet } from 'nanoid';
import { createTinyUrl, findTinyUrl } from './urlService';
import type { tinyUrl } from './urlService';

export async function saveHashedUrl(url: string, baseRoute: string): Promise<tinyUrl> {
  let hashedValue;
  do {
    hashedValue = await nanoid();
    const tinyUrl: tinyUrl = await findTinyUrl(hashedValue);
    if (!tinyUrl) break;
  } while (true);
  const isUrlCreated: boolean = await createTinyUrl(hashedValue, url);
  const response: tinyUrl = isUrlCreated ? await findTinyUrl(hashedValue) : null;
  return {
    hashedValues: response?.hashedValues,
    originalURL: response?.originalURL,
    creationDate: response?.creationDate,
    expirationDate: response?.expirationDate,
    baseRoute: baseRoute !== '' ? `${baseRoute}/${response?.hashedValues}` : undefined
  }
}

export async function saveCustomHashedUrl(url: string, customText: string, baseRoute: string, size?: number): Promise<tinyUrl> {
  let hashedValue;
  do {
    const customizedNanoid = customAlphabet(customText, size ?? 10);
    hashedValue = await customizedNanoid();
    const tinyUrl: tinyUrl = await findTinyUrl(hashedValue);
    if (!tinyUrl) break;
  } while (true);
  const isUrlCreated: boolean = await createTinyUrl(hashedValue, url);
  const response: tinyUrl = isUrlCreated ? await findTinyUrl(hashedValue) : null;
  return {
    hashedValues: response?.hashedValues,
    originalURL: response?.originalURL,
    creationDate: response?.creationDate,
    expirationDate: response?.expirationDate,
    baseRoute: baseRoute !== '' ? `${baseRoute}/${response?.hashedValues}` : undefined
  }
}

export async function getOriginalUrl(hashedValue: string): Promise<tinyUrl | null> {
  const response: tinyUrl = await findTinyUrl(hashedValue);
  return response ?? {};
}
