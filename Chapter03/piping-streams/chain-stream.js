const fs = require('node:fs');
const zlib = require('node:zlib');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt.gz');

// Chain the streams: read -> compress -> write
readStream.pipe(zlib.createGzip()).pipe(writeStream);