# node_encrypt
Examples of how to encrypt and decrypt files with nodejs.

A CLI program that will allow us to compress and encrypt a file using a password, and then decrypt and uncompress that file using the same password.

## Steps to encrypt
- Read text/file
- Compress
- Encrypt
- Add data from encryption
- Write cipher to file

## Steps to decrypt
- Read cipher text
- Get encryption data
- Decrypt
- Decompress
- Write plain text to file

### Examples

```node ./src/cli.js encrypt ./file.txt myPassword```
```node ./src/cli.js decrypt ./file.txt myPassword```