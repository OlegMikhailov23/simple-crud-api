const Person = require('../models/personModel');

// @route GET /api/getAllDocks

const getPersons = async(req, res) => {
    try {
        const persons = await Person.findAllPersons();
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify(persons));
    } catch (e) {
        console.log(e);
    }
}

// @route GET /api/getAllDocks/:id

const getPerson = async(req, res, id) => {
    try {
        const person = await Person.findPerson(id);
        if (!person) {
            res.writeHead(404, { 'Content-Type' : 'application/json' });
            res.end(JSON.stringify({ message: 'person does not exist!' }));
        } else {
            res.writeHead(200, { 'Content-Type' : 'application/json' });
            res.end(JSON.stringify(person));
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getPersons,
    getPerson
}


// res.writeHead(200, { 'Content-Type' : 'application/json' });
// res.end(JSON.stringify(db));
