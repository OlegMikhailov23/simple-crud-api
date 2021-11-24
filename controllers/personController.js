const Person = require('../models/personModel');
const { getPostData } = require('../utils');

// @route GET /api/getAllDocks
console.log(Person);
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

// @route POST /api/create

const createPerson = async(req, res) => {
    try {
        const body = await getPostData(req);
        console.log(body);

        const {name, age, hobbies} = JSON.parse(body);

        const person = {
            name,
            age,
            hobbies,
        }

        const newPerson = await Person.create(person);
        res.writeHead(201, { 'Content-Type' : 'application/json' })
        return res.end(JSON.stringify(newPerson));

    } catch (e) {
        console.log(e);
    }
}

// @route PUT /api/update/:id

const updatePerson = async(req, res, id) => {
    try {

        const person = await Person.findPerson(id);

        if (!person) {
            res.writeHead(404, { 'Content-Type' : 'application/json' });
            res.end(JSON.stringify({ message: 'person does not exist!' }));
        } else {
            const body = await getPostData(req);
            console.log(body);

            const {name, age, hobbies} = JSON.parse(body);

            const personData = {
                name : name || person.name,
                age : age || person.age,
                hobbies: hobbies || person.hobbies
            }

            const updatedPerson = await Person.update(id, personData);
            res.writeHead(200, { 'Content-Type' : 'application/json' })
            return res.end(JSON.stringify(updatedPerson));
        }

    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getPersons,
    getPerson,
    createPerson,
    updatePerson
}
