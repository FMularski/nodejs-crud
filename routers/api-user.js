const { request } = require('express');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const database = require('../models/database');

router.get('/', (request, response) => {
    response.send({users: database.users});
})

router.get('/:id', (request, response) => {
    const userInDb = database.users.find(user => user.id == request.params.id);
    if (!userInDb) return response.status(404).send('Invalid id.');

    return response.status(200).send(userInDb);
})

router.post('/', (request, response) => {
    const { error } = validateUser(request.body);
    if (error) return response.status(400).send(error);

    const newUser = {
        id: database.users.length + 1,
        login: request.body.login,
        email: request.body.email,
        password: request.body.password
    }

    database.users.push(newUser);
    return response.status(200).send(newUser);
})

router.put('/:id', (request, response) => {
    const userInDb = database.users.find(user => user.id == request.params.id);
    if (!userInDb) return response.status(404).send('Invalid id.');

    const { error } = validateUser(request.body);
    if ( error) return response.status(400).send(error.message);

    userInDb.login = request.body.login;
    userInDb.email = request.body.email;
    userInDb.password = request.body.password;

    return response.status(200).send(userInDb);
})

router.delete('/:id', (request, response) => {
    const userInDb = database.users.find(user => user.id == request.params.id);
    if (!userInDb) return response(404).send('Invalid id.');

    const indexToDelete = database.users.indexOf(userInDb);
    database.users.splice(indexToDelete, 1);

    return response.status(200).send(userInDb);
})

function validateUser(user){
    const schema = Joi.object({
        login: Joi.string()
        .min(6)
        .required(),

        email: Joi.string()
        .required(),

        password: Joi.string()
        .min(6)
        .required(),
    });

    return schema.validate(user);
}

module.exports = router;
