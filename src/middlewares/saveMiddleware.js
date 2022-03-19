//const path= require('path');
const {body} = require('express-validator');
//const user = require('../../disabled/data/models/user');
//const db = require('../database/models')
const validations = [
    body("email").notEmpty().withMessage('Ingresar email').bail().
    isEmail().withMessage("Email inválido"),
    body('password').matches(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/)
    .isLength({ min: 6}).withMessage('Mínimo 6 caracteres, 1 letra, 1 número y 1 character especial'),
   
    body("firstName").notEmpty().withMessage('Ingresar nombre'),
    body("lastName").notEmpty().withMessage('Ingresar apellido'),

    body('phone').isNumeric().withMessage('*Este campo debe ser numérico'),

]
module.exports = validations;



