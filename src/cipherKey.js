import { createHash } from 'crypto';

export const getCipherKey = (key) => createHash('sha256').update(key).digest();