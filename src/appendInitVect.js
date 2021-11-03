import { Transform } from 'stream';

// Appends the initialization vector to the front of the stream, which then is used for decryption
export class AppendInitVect extends Transform {
    constructor(initVect, opts) {
        super(opts);
        this.initVect = initVect;
        this.appended = false;
    }

    _transform(chunk, encoding, cb) {
        if (!this.appended) {
            this.push(this.initVect);
            this.appended = true;
        }
        this.push(chunk);
        cb();
    }
}