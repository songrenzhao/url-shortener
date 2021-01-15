import { nanoid, customAlphabet } from 'nanoid';
import { createTinyUrl, findTinyUrl } from './urlService';
import type { tinyUrl } from './urlService';

export async function saveHashedUrl(url: string): Promise<tinyUrl> {
  let hashedValue;
  do {
    hashedValue = await nanoid();
    const tinyUrl: tinyUrl = await findTinyUrl(hashedValue);
    if (!tinyUrl) break;
  } while (true);
  const isUrlCreated: boolean = await createTinyUrl(hashedValue, url);
  const tinyUrl: tinyUrl = isUrlCreated ? await findTinyUrl(hashedValue) : null;
  return tinyUrl;
}

export async function saveCustomHashedUrl(url: string, customText: string, size?: number): Promise<tinyUrl> {
  let hashedValue;
  do {
    const customizedNanoid = customAlphabet(customText, size ?? 10);
    hashedValue = await customizedNanoid();
    const tinyUrl: tinyUrl = await findTinyUrl(hashedValue);
    if (!tinyUrl) break;
  } while (true);
  const isUrlCreated: boolean = await createTinyUrl(hashedValue, url);
  const tinyUrl: tinyUrl = isUrlCreated ? await findTinyUrl(hashedValue) : null;
  return tinyUrl;
}

export async function getOriginalUrl(hashedValue: string): Promise<string | null> {
  const response: tinyUrl = await findTinyUrl(hashedValue);
  return response?.originalURL ?? null;
}
