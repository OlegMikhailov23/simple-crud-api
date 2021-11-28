# Simple CRUD API

A simple CRUD API using in-memory database underneath.

##Installation and run app.:
1) install all dependencies : `$ npm i`;
2) download API tool postman : https://www.postman.com/downloads/;
3) open command line and run app : `$ npm run sart:dev` for development or `$ npm run sart:prod` for production;
4) For testing app use : `$ npm run test`

##Usage:

API path `/person`:
    * **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
    * **POST** `/person` is used to create record about new person and store it in database
    * **PUT** `/person/${personId}` is used to update record about existing person
    * **DELETE** `/person/${personId}` is used to delete record about existing person from database
    
Persons are stored as `objects` that have following properties:
    * `id` — unique identifier (`string`, `uuid`) generated on server side
    * `name` — person's name (`string`, **required**)
    * `age` — person's age (`number`, **required**)
    * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
    
Value of port on which application is running stored in `.env` file.                          
