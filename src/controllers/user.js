const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
const model = require('../models/user')

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
    profile: (req,res) => {
        return res.render('users/profile',{
        user: req.session.userLogged
    });
},
    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },
    
}

