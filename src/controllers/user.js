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
    access: (req, res) => {
      let errors = validator.validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.render("users/login", {
          styles: ["login"],
          errors: errors.mapped(),
        });
      }
  
      let exist = user.search("email", req.body.email);
      if (!exist) {
        return res.render("users/login", {
          styles: ["login"],
          errors: {
            email: {
              msg: "email sin registro",
            },
          },
        });
      }
  
      if (!bcryptjs.compareSync(req.body.password, exist.password)) {
        return res.render("users/login", {
          styles: ["login"],
          errors: {
            password: {
              msg: "La contraseña es invalida",
            },
          },
        });
      }
  
      if (req.body.remember) {
        res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 60 * 24 * 30 });
      }
      req.session.user = exist;
  
      return res.redirect("/users/profile");
    },


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

