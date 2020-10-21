const express = require('express');
const router = express.Router();
const Joi = require('joi');
const database = require('./database');


router.get('/', (request, response) => {
    usersInDb = database.users;
    response.render('users/index', {users: usersInDb});
})  

router.get('/add', (request, response) => {
    response.render('users/new');
})

router.get('/:id', (request, response) => {
    const userInDb = database.users.find(user => user.id == request.params.id);
    if (!userInDb) return response.status(404).send('Invalid id.');

    response.render('users/user', {user: userInDb});
})


router.post('/', (request, response) => {

    const { error } = validateUser(request.body);

    if (error) return response.status(400).send(error.message);

    const newUser = {
        id: database.users.length + 1,
        login: request.body.login,
        email: request.body.email,
        password: request.body.password
    }

    database.users.push(newUser);

    response.redirect('/users');
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