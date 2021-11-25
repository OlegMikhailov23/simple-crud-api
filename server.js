require('dotenv').config();
const http = require('http');
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./controllers/personController');

const server = http.createServer((req, res) => {
    if (req.url === '/api/person' && req.method === 'GET') {
        getPersons(req, res);
    } else if (req.url.match(/\/api\/person\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getPerson(req, res, id);
    } else if (req.url === '/api/person' && req.method === 'POST') {
        createPerson(req, res);
    } else if (req.url.match(/\/api\/person\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updatePerson(req, res, id)
    } else if (req.url.match(/\/api\/person\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deletePerson(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify({message : 'Resource, that you requested does not exist'}));
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`SERVER IS RUNNING ON ${PORT} PORT`));
