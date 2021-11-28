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
    getPostData
}
