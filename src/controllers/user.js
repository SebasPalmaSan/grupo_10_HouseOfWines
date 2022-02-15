const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
const model = require('../models/user')

module.exports = {
    login: (req, res) => res.render('users/login',{
        styles: ['login'],
        title: 'Iniciá sesión',
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
                msg: "el email no esta registrado",
              },
            },
          });
        }
    
        if (!bcrypt.compareSync(req.body.password, exist.password)) {
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
    register: (req, res) => res.render('users/register',{
        styles: ['register'],
        title: 'Crear tu cuenta'
    }),
    create: (req, res) => res.render('users/register', {
        styles: ['register'],
    }),
    
    profile: (req,res) => {
        return res.render('users/profile',{
        user: req.session.userLogged
    });
},
save: (req, res) => {
    let errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("users/register", {
        styles: ["register"],
        errors: errors.mapped(),
      });
    }

    let exist = user.search("email", req.body.email);

    if (exist) {
      return res.render("users/register", {
        styles: ["register"],
        errors: {
          email: {
            msg: "el email ya se encuentra registrado",
          },
        },
      });
    }

    if (req.body.password != req.body.password2) {
      return res.render("users/register", {
        styles: ["register"],
        errors: {
          password: {
            msg: "Las contraseñas no coinciden",
          },
        },
      });
    }
    let userRegisted = user.create(req.body);
    return res.redirect("/users/login");
  },
  logout: (req, res) => {
    delete req.session.user;
    res.cookie("user", null, { maxAge: -1 });
    return res.redirect("/");
    }

    //logout: (req,res) => {
        //res.clearCookie('userEmail');
        //req.session.destroy();
        //return res.redirect('/');
    
    
    
}

