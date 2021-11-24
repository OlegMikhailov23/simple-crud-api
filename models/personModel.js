const db = require('../data/data');

const findAllPersons = () => {
    return new Promise((res, rej) => {
        res(db);
    })
}

const findPerson = (id) => {
    return new Promise((res, rej) => {
        const person = db.find((person) => person.id === +id);
        res(person);
    })
}

module.exports = {
    findAllPersons,
    findPerson
}
