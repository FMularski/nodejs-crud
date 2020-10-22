const express = require('express');
const router = express.Router();
const Joi = require('joi');

const database = require('../models/database');

router.get('/', (request, response) => {
    productsInDb = database.products;
    response.render('products/index', {products: productsInDb});
})

router.get('/:id', (request, response) => {
    const productInDb = database.products.find(product => product.id == request.params.id);
    if ( !productInDb) return response.status(404).send('Invalid id.');

    response.render('products/product', {product: productInDb});
})

module.exports = router;