const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
//const model = require('../database/models/User')
//const validator = require('express-validator');
const db = require('../database/models');
//const user = require('../database/models/user');


const userController = {

    
    create: (req, res) => res.render('users/register',
        {
          styles: ['register'],
          title: 'Crear tu cuenta'
        }),

    save: (req, res) =>{
      const errors = validationResult(req)
      if(errors.isEmpty()){
        
          db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcryptjs.hashSync(req.body.password,10),
            email: req.body.email,
            phone: req.body.phone,
            adress: req.body.adress,
            avatar: req.body.avatar,
            admin: String(req.body.email).includes('@how')? 1 : 0,
          }).then(user => {
              res.redirect('/users/login');
          
          })
          .catch(error => res.send(error))
        }else{
          return res.render('users/register', 
                {
                  styles: ['register'],
                  title: 'Crear tu cuenta',
                  errors: errors.mapped(), 
                  user: req.body.user
                });
        } 
    },

    login: (req, res) => res.render('users/login',
        {
          styles: ['login'],
          title: 'Iniciá sesión',
        }),

    access: (req, res) => {
      //return res.send(req.body)        
      db.User.findOne({
                where: {
                  email: req.body.email
                }
              })
              .then(users => {
              let errors = validationResult(req);
          
              if (!errors.isEmpty()) {
                return res.render("users/login", {
                  styles: ["login"],
                  errors: errors.mapped(),
                });
              }
          
              if (!users) {
                return res.render("users/login", {
                  styles: ["login"],
                  errors: {
                    email: {
                      msg: "email sin registro",
                    },
                  },
                });
              }
          
              if (!bcryptjs.compareSync(req.body.password,users.password)){
              return res.render("users/login", {
                  styles: ["login"],
                  errors: {
                    password: {
                      msg: "Contraseña Incorrecta!",
                    },
                  },
                });
              
              }else {
          
              if (req.body.remember) {
                res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 60 * 24 * 30 });
              }
              req.session.user = users;
          
              return res.redirect("/users/profile");
              
              }
            }
              )  
          
            .catch(error => res.send(error))
          },
               

    list: async (req, res) => {
      await db.User.findAll({
        include: ['avatars']
      })
      .then(users => {
        res.render('users/list', {
          styles: ['product/product'],
          title: 'Usuarios',
          users: users
        })
      })
    },
    
    /*list: (req, res) => {
      db.User.findAll()
          .then(users => { 
            res.render("users/list", {
              styles: ["list"],
              title: "Usuarios registados",
              users: users
              })
          })
  },*/
    profile: (req,res) => {
      //return res.send(req.body)  
      db.User.findOne(
        { where: 
          { email: req.session.user.email} },
        {
        include: ['avatar']
      })
          .then(user => {
            res.render('users/profile',{
          user: user
    })
  })
  .catch(error => res.send(error))
},
    edit: (req, res) => {
      db.User.findByPk(req.params && req.params.id ? req.params.id : req.session.userLogged.id)
      .then(users => { 
        res.render('users/edit',{
          styles:["userUpdate"],
          title: 'Usuario: '+ users.firstName,
          users:users
        })
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


module.exports = userController