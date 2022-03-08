const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
const model = require('../models/user')
//const validator = require('express-validator');
const db = require('../database/models');

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
      let errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.render("users/login", {
          styles: ["login"],
          errors: errors.mapped(),
        });
      }
  
      let exist = model.search("email", req.body.nombreUsuario);
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
  
      if (!bcryptjs.compareSync(req.body.contrasena, exist.password)) {
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
      req.session.userLogged = exist;
  
      return res.redirect("/users/profile");
    },

    save: (req, res) =>{
        const errors = validationResult(req)
        /*res.send(errors.mapped())
        const create = model.create(req.body);
          return res.redirect('/users/login');*/
        if(errors.isEmpty()){
          //return res.send(req.body)
          req.body.avatar = req.file?req.file.filename:null;
          //return res.send(req.body);
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
    list: (req, res) => {
      db.user.findAll()
          .then(users => { res.render("users/list", {
              styles: ["list"],
              title: "Usuarios registados",
              users: users
              })
          })
  },
    profile: (req,res) => {
      return res.render('users/profile',{
          user: req.session.userLogged
    });
},
    edit: (req, res) => {
      db.user.findByPk(req.params.id)
      .then(users => { 
        res.render('users/userUpdate',{
          styles:["userUpdate"],
          title: 'Usuario: '+ user.firstName,
          users:users})
  })
  .catch(error => res.send(error))
},
    userUpdate: (req, res) =>{
      db.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthdate: req.body.birthdate,
        phone: req.body.phone,
        adress: req.body.adress,
        email: req.body.email,

  },{
        where:{
        id: req.params.id
    }
  })
  
      res.redirect('/users/userUpdate');
},

    user_delete: (req,res) => {
      db.user.destroy({
        where: {
        id: req.params.id
    }
  })
      res.redirect('/users/register');
},
 
    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
}
}
