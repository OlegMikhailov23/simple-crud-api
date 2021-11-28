const request = require('supertest')
const app = require('../server.js')

describe('Check APP E2E', () => {
    afterAll(async () => {
        await app.close()
    })

    it('should get empty array', async () => {
        const res = await request(app).get(`/person`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    it('should create a new person', async () => {
        const res = await request(app)
            .post('/person')
            .send({
                name: "Oleg",
                age: 25,
                hobbies: ["tennis"]
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toBe('Oleg');
        expect(res.body.age).toBe(25);
    })

    it('should get a single person', async () => {
        const res = await request(app)
            .post('/person')
            .send({
                name: "Oleg",
                age: 25,
                hobbies: ["tennis"]
            })

        const req = await request(app)
            .get(`/person/${res.body.id}`);
        expect(req.statusCode).toEqual(200);
    });

    it('should update a person', async () => {
        const res = await request(app)
            .post('/person')
            .send({
                name: "Oleg",
                age: 25,
                hobbies: ["tennis"]
            })

        const req = await request(app)
            .put(`/person/${res.body.id}`)
            .send({
                name: "TEST",
                age: 255,
                hobbies: ["tennis"]
            })

        expect(req.statusCode).toEqual(200);
        expect(req.body.name).toBe("TEST");
        expect(req.body.age).toBe(255);
        expect(req.body.id).toBe(res.body.id);
    });

    it('should remove a person', async () => {
        const res = await request(app)
            .post('/person')
            .send({
                name: "Oleg",
                age: 25,
                hobbies: ["tennis"]
            })

        await request(app).delete(`/person/${res.body.id}`);

        const checkDel = await request(app).get(`/person/${res.body.id}`);
        expect(checkDel.statusCode).toEqual(404);
    });
})
