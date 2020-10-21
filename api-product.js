const { request } = require('express');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const database = require('./database');

router.get('/', (request, response) => {
    return response.status(200).send(database.products);
})

router.get('/:id', (request, response) => {
    const productInDb = database.products.find(product => product.id == request.params.id);
    if(!productInDb) return response.status(404).send('Invalid id.');

    return response.status(200).send(productInDb);
})

router.post('/', (request, response) => {
    const { error } = validateProduct(request.body);
    if( error) return response.status(400).send(error.message);

    const newProduct = {
        id: database.products.length + 1,
        name: request.body.name,
        description: request.body.description
    }

    database.products.push(newProduct);
    return response.status(200).send(newProduct);
})

router.put('/:id', (request, response) => {
    const productInDb = database.products.find(product => product.id == request.params.id);
    if(!productInDb) return response.status(404).send('Invalid id.');

    const { error } = validateProduct(request.body);
    if( error) return response.status(400).send(error.message);

    productInDb.name = request.body.name;
    productInDb.description = request.body.description;

    return response.status(200).send(productInDb);
})

router.delete('/:id', (request, response) => {
    const productInDb = database.products.find(product => product.id == request.params.id);
    if(!productInDb) return response.status(404).send('Invalid id.');

    const indexToDelete = database.products.indexOf(productInDb);
    database.products.splice(indexToDelete, 1);

    return response.status(200).send(productInDb);
})

function validateProduct(product){
    const schema = Joi.object({
        name: Joi.string()
        .min(5)
        .required(),
        description: Joi.string()
        .max(100)
        .required()
    })

    return schema.validate(product);
}

module.exports = router;