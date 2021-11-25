let persons = require('../data/data');
const { v4: uuidv4 } = require('uuid');

const findAllPersons = () => {
    return new Promise((res, rej) => {
        res(persons);
    })
}

const findPerson = (id) => {
    return new Promise((res, rej) => {
        const person = persons.find((person) => person.id === id);
        res(person);
    })
}

const create = (person) => {
    return new Promise((res, rej) => {
        const newPerson = {id: uuidv4(), ...person};
        persons.push(newPerson);
        res(newPerson);
    })
}

const update = (id, person) => {
    return new Promise((res, rej) => {
        const idx = persons.findIndex((person) => person.id === id);
        persons[idx] = {id, ...person}
        res(persons[idx]);
    })
}

const remove = (id) => {
    return new Promise((res, rej) => {
        persons = persons.filter((person => person.id !== id));
        res();
    })
}

module.exports = {
    findAllPersons,
    findPerson,
    create,
    update,
    remove,
}
