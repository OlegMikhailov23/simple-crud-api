const Person = require('../models/personModel');
const { getPostData } = require('../utils');

// @route GET /person
const getPersons = async(req, res) => {
    try {
        const persons = await Person.findAllPersons();
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify(persons));
    } catch (e) {
        throw new Error(e);
    }
}

// @route GET /person/:id

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
        throw new Error(e);
    }
}

// @route POST /person

const createPerson = async(req, res) => {
    try {
        const body = await getPostData(req);
        const {name, age, hobbies} = JSON.parse(body);

        if (!name || !age || !hobbies) {
            res.writeHead(400, { 'Content-Type' : 'application/json' })
            return res.end(JSON.stringify({message: 'invalid fields or value'}));
        }

        const person = {
            name,
            age,
            hobbies,
        }

        const newPerson = await Person.create(person);
        res.writeHead(201, { 'Content-Type' : 'application/json' })
        return res.end(JSON.stringify(newPerson));

    } catch (e) {
        throw new Error(e);
    }
}

// @route PUT /person/:id

const updatePerson = async(req, res, id) => {
    try {
        const person = await Person.findPerson(id);

        if (!person) {
            res.writeHead(404, { 'Content-Type' : 'application/json' });
            res.end(JSON.stringify({ message: 'person does not exist!' }));
        } else {
            const body = await getPostData(req);
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
        throw new Error(e);
    }
}

// @route DELETE /person/:id

const deletePerson = async(req, res, id) => {
    try {
        const person = await Person.findPerson(id);
        if (!person) {
            res.writeHead(404, { 'Content-Type' : 'application/json' });
            res.end(JSON.stringify({ message: 'person does not exist!' }));
        } else {
            await Person.remove(id);
            res.writeHead(200, { 'Content-Type' : 'application/json' });
            res.end(JSON.stringify({message: `Person ${id} has been deleted!`}));
        }
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = {
    getPersons,
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
}
