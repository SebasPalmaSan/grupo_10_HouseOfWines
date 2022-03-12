const {body} = require('express-validator');
//const user = require('../../disabled/data/models/user');
//const db = require('../database/models')
const validations = [
    body('email').isEmail().withMessage('Email invalido'),
    body('password').matches(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/)
    .isLength({ min: 6})
    .withMessage('Mínimo 6 caracteres, 1 letra, 1 número y 1 character especial')
]

module.exports = validations;



