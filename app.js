const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser())

let pizzas = [
    { id: "1", name: "square", price: 24 },
    { id: "2", name: "rectangle", price: 30 },
    { id: "3", name: "triangle", price: 32 },
]

// Get
app.get("/", (req,res) => {
    res.json({message: "hello pizzas"})
})

// Get
app.get("/pizzas", (req, res) => {
    res.json(pizzas);
});

app.get("/pizzas/:id", (req, res) => {
    const selectedPizza = pizzas.find(pizza => {
        return pizza.id === req.params.id
    })
    res.json(selectedPizza)
})

// POST
app.post('/pizzas', (req, res) => {
    pizzas = [...pizzas, req.body]
    res.json(req.body)
})

// PUT
app.put("/pizzas/:id", (req, res) => {
    let selectedPizza = pizzas.find(pizza => {
        return pizza.id === req.params.id
    })
    selectedPizza = { ...selectedPizza, ...req.body }
    pizzas[Number(req.params.id) - 1] = selectedPizza
    res.json(pizzas)
})

// Delete
app.delete("/pizzas/:id", (req, res) => {
    pizzas = pizzas.filter(pizza => {
        return pizza.id !== req.params.id
    })
    // res.json("deleted pizza id: " + req.params.id)
    res.json(`deleted pizza id: ${req.params.id}`)
})


const exportModules = {
    app: app,
    PORT: PORT,
    pizzas: pizzas
}

module.exports = exportModules

