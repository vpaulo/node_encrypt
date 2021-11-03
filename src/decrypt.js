import { createDecipheriv } from 'crypto';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { createUnzip } from 'zlib';

import { algorithm, enc_ext, unenc_ext } from './constants.js';
import { getCipherKey } from './cipherKey.js';

export function decrypt ({ file, password }) {
    const readPath = join(file + enc_ext);
    const readInitVect = createReadStream(readPath, { end: 15 }); // Get the initialization vector
    let initVect;

    readInitVect.on('data', (chunk) => {
        initVect = chunk;
    });

    readInitVect.on('close', () => {
        const cipherKey = getCipherKey(password);
        const readStream = createReadStream(readPath, { start: 16 });
        const decipher = createDecipheriv(algorithm, cipherKey, initVect);
        const unzip = createUnzip();
        const writeStream = createWriteStream(join(file + unenc_ext));

        writeStream.on('close', () => {
            console.log('Decryption successful.');
        });

        readStream
            .pipe(decipher)
            .pipe(unzip)
            .pipe(writeStream);
    });
} 