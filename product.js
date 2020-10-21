const express = require('express');
const router = express.Router();
const Joi = require('joi');

const database = require('./database');

router.get('/', (request, response) => {
    productsInDb = database.products;
    response.render('products/index', {products: productsInDb});
})

router.get('/add', (request, response) => {
    response.render('products/new');
})

router.get('/:id', (request, response) => {
    const productInDb = database.products.find(product => product.id == request.params.id);
    if ( !productInDb) return response.status(404).send('Invalid id.');

    response.render('products/product', {product: productInDb});
})

router.post('/', (request, response) => {
    const { error } = validateProduct(request.body);
    if (error) return response.status(400).send(error.message);

    const newProduct = {
        id: database.products.length + 1,
        name: request.body.name,
        description: request.body.description
    }

    database.products.push(newProduct);
    response.redirect('/products');
})

function validateProduct(product){
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required(),
        description: Joi.string()
        .max(100)
        .required()
    });

    return schema.validate(product);
}

module.exports = router;