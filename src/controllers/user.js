const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
//const model = require('../database/models/User')
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
      if(errors.isEmpty()){
        db.User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password, //bcryptjs.hashSync(req.body.password,10),
          email: req.body.email,
          phone: req.body.phone,
          adress: req.body.adress,
          birthdate: req.body.birthdate,
          avatar: req.file?req.file.filename:null, 
          admin: String(req.body.email).includes('@how')? 1 : 0,
        }).then(user => {
          res.redirect('/users/login');

        }).catch(error => res.send(error))
        
      }else{
        return res.render('users/register', {
          styles: ['register'],
          title: 'Crear tu cuenta',
          errors: errors.mapped(), 
          user: req.body
      });

      } 
    },
    list: (req, res) => {
      db.User.findAll()
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
      db.User.findByPk(req.params && req.params.id ? req.params.id : req.session.userLogged.id)
      .then(users => { 
        res.render('users/userUpdate',{
          styles:["userUpdate"],
          title: 'Usuario: '+ users.firstName,
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
