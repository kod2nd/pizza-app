const request = require('supertest');
const exportModules = require('../app')
const app = exportModules.app

test('descriptive message', () => {
    expect(1).toEqual(1)
})

test('GET / should return hello pizzas', async () => {
    const response = await request(app).get("/");
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ message: "hello pizzas" })
})

test('Get /pizzas should return an array of pizzas', async () => {
    const pizzas = exportModules.pizzas;
    const response = await request(app).get("/pizzas");
    expect(response.status).toEqual(200)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body).toEqual(pizzas)
})

test('Get /pizzas/1 should return a object of pizzas', async () => {
    const pizzas = exportModules.pizzas;
    const response = await request(app).get("/pizzas/1");
    expect(response.status).toEqual(200)
    expect(response.body).toMatchObject({})
    expect(response.body.id).toEqual("1")
})


test('PUT /pizza/:id should update an existing object', async () => {
    const testData = {
        name: "test pizza",
        price: 10
    }

    const ID = 2

    const response = await request(app).put(`/pizzas/${ID}`).send(testData);

    expect(response.status).toEqual(200)
    expect(response.body[ID - 1]).toMatchObject(testData)
});

test('POST /pizza should create a new pizza object', async () => {
    const testData = {
        name: "test pizza",
        price: 10
    }
    const response = await request(app).post("/pizzas").send(testData);

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(testData)
});

test('Delete /pizza/1 should remove the pizza object', async () => {
    const response = await request(app).delete('/pizzas/1')
    expect(response.status).toEqual(200)
    expect(response.body).toEqual('deleted pizza id: 1')

});

