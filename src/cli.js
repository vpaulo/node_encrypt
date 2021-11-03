import { encrypt } from './encrypt.js';
import { decrypt } from './decrypt.js';

const [ mode, file, password ] = process.argv.slice(2);
const cli = { encrypt, decrypt };

cli[mode] && cli[mode]({ file, password });