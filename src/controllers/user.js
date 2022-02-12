const model = require('../models/user')
const {validationResult} = require("express-validator");
module.exports = {
    login: (req, res) => res.render('users/login',{
        styles: ['login'],
        title: 'Iniciá sesión',
    }),
    register: (req, res) => res.render('users/register',{
        styles: ['register'],
        title: 'Crear tu cuenta'
    }),
    create: (req, res) => res.render('users/register', {
        styles: ['register'],
    }),
    access: (req, res) => res.send(req.body),
    save: (req, res) =>{
        const errors = validationResult(req)
        //res.send(errors.mapped())
        if(errors.isEmpty()){
            const create = model.create(req.body);
            res.redirect('/users/login');
        }else{
            return res.render('users/register', {
                styles: ['register'],
                title: 'Crear tu cuenta',
                errors: errors.mapped(), 
                user: req.body
            });
        }
        //return errors.isEmpty() ? res.send(user.create(req.body)) : res.send(errors.mapped()) ;
    },
    logout: (req,res) => res.send(logout),
    profile: (req,res) => res.render('users/profile')
}

