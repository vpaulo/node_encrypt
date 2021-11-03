import { randomBytes, createCipheriv } from 'crypto';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { createGzip } from 'zlib';

import { AppendInitVect } from './appendInitVect.js';
import { algorithm, enc_ext } from './constants.js';
import { getCipherKey } from './cipherKey.js';

export function encrypt ({ file, password }) {
    const initVect = randomBytes(16); // Generate a secure, pseudo randon initialization vector
    const cipherKey = getCipherKey(password); // Generate a cipher key from the password
    const readStream = createReadStream(file);
    const gzip = createGzip();
    const cipher = createCipheriv(algorithm, cipherKey, initVect);
    const appendInitVect = new AppendInitVect(initVect);
    const writeStream = createWriteStream(join(file + enc_ext));

    writeStream.on('close', () => {
        console.log('Encryption successful.');
    });

    readStream
        .pipe(gzip)
        .pipe(cipher)
        .pipe(appendInitVect)
        .pipe(writeStream);
}