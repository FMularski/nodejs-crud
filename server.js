/* config file */
require('dotenv').config();

/* imports */
const { request } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const user = require('./routers/user');
const apiUser = require('./routers/api-user');

const product = require('./routers/product');
const apiProduct = require('./routers/api-product');

const port = process.env.PORT || 3000;

const app = express();

/* ejs */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/* static files */
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use('/users', user);
app.use('/api/users', apiUser);
app.use('/products', product);
app.use('/api/products', apiProduct);

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})

app.get('/', (request, response) => {
    response.render('index');
})