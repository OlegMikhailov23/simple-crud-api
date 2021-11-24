require('dotenv').config();
const http = require('http');
const { getPersons, getPerson, createPerson, updatePerson } = require('./controllers/personController');

const server = http.createServer((req, res) => {
    if (req.url === '/api/getAllDocs' && req.method === 'GET') {
        getPersons(req, res);

    } else if (req.url.match(/\/api\/getAllDocs\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getPerson(req, res, id);

    } else if (req.url === '/api/create' && req.method === 'POST') {
        createPerson(req, res);
    } else if (req.url.match(/\/api\/getAllDocs\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updatePerson(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify({message : 'Invalid Route'}));
    }
});



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server is running on ${PORT} port`));
