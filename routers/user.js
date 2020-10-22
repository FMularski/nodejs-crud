const express = require('express');
const router = express.Router();
const Joi = require('joi');
const database = require('../models/database');


router.get('/', (request, response) => {
    usersInDb = database.users;
    response.render('users/index', {users: usersInDb});
})  

router.get('/:id', (request, response) => {
    const userInDb = database.users.find(user => user.id == request.params.id);
    if (!userInDb) return response.status(404).send('Invalid id.');

    response.render('users/user', {user: userInDb});
})

module.exports = router;