const express = require('express');
const router = express.Router();
const database = require('./database');

app.get('/products', (request, response) => {
    productsInDb = database.products;
    response.render('products/index', {products: productsInDb});
})

module.exports = router;