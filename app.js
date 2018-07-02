const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000;

app.use(bodyParser())

let pizzas = [
    { id: "1", name: "square", price: 24 },
    { id: "2", name: "rectangle", price: 30 },
    { id: "3", name: "triangle", price: 32 },
]

// Get
app.get("/pizzas", (req, res) => {
    res.send(pizzas);
});

app.get("/pizzas/:id", (req, res) => {
    const selectedPizza = pizzas.find(pizza => {
        return pizza.id === req.params.id
    })
    console.log(selectedPizza)
    res.send(selectedPizza)
})

// POST
app.post('/pizzas', (req, res) => {
    pizzas = [...pizzas, req.body]
    res.send(req.body)
})

// PUT
app.put("/pizzas/:id", (req, res) => {
    let selectedPizza = pizzas.find(pizza => {
        return pizza.id === req.params.id
    })
    selectedPizza = { ...selectedPizza, ...req.body }
    pizzas[Number(req.params.id) - 1] = selectedPizza
    res.send(pizzas)
})

// Delete
app.delete("/pizzas/:id", (req, res) => {
    pizzas = pizzas.filter(pizza => {
        return pizza.id !== req.params.id
    })
    res.send("deleted pizza id: " + req.params.id)
})

const server = app.listen(PORT, () => {
    console.log("Server has started")
});

