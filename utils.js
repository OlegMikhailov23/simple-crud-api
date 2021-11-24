const fs = require('fs');

const writeDataToFile = (fileName, content) => {
    fs.writeFileSync(fileName, JSON.stringify(content), 'utf-8', err => {
        if (err) {
            console.log(err);
        }
    })
}

const getPostData = (req) => {
    return new Promise((res, rej) => {
        try {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                res(body);
            })
        } catch (e) {
            rej(e);
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData
}
