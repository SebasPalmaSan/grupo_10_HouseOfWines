const {body} = require('express-validator');
const user = require('../models/user');
const validations = [
    body('email').isEmail().withMessage('Email invalid').custom(value => {
        let search = user.search('email', value);
        return search ? Promise.reject('Email used') : Promise.resolve();
    }),
    body('password').matches(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/).withMessage('Mínimo 6 caracteres, 1 letra, 1 número y 1 character especial')
]

module.exports = validations;