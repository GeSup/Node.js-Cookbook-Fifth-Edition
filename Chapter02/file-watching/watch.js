const fs = require('node:fs');
const file = './file.txt';

fs.watch(file, (eventType, filename) => {
    const formattedTime = new Intl.DateTimeFormat('en-GB',
        {
            dateStyle: 'full',
            timeStyle: 'long'
        }).format(new Date());
    return console.log(`event ${eventType}, ${filename} updated ${formattedTime}`);
});