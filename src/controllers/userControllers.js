const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
const db = require('../database/models');

const userController = {

    //Crear un usuario
    create: (req, res) => res.render('users/register',
        {
          styles: ['register'],
          title: 'Crear tu cuenta'
        }),

    //Guardar un usuario
    save: (req, res) =>{
      const errors = validationResult(req)
      if(errors.isEmpty()){
        if(req.file){
          db.Image.create({
            url: req.file.filename,
          }).then(ImagenAvatar => {
          db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcryptjs.hashSync(req.body.password,10),
            email: req.body.email,
            phone: req.body.phone,
            adress: req.body.adress,
            avatar: ImagenAvatar.id,
            admin: String(req.body.email).includes('@how')? 1 : 0,
          }).then(user => {
              res.redirect('/users/login');
          
          }).catch(error => res.send(error))})

        }else{
          db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcryptjs.hashSync(req.body.password,10),
            email: req.body.email,
            phone: req.body.phone,
            adress: req.body.adress,
            avatar: null,
            admin: String(req.body.email).includes('@how')? 1 : 0,
          }).then(user => {
              res.redirect('/users/login');
          
          }).catch(error => res.send(error))

        }
      
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

    //Logueo de usuario
    login: (req, res) => res.render('users/login',
        {
          styles: ['login'],
          title: 'Iniciá sesión',
        }),

    //Acceso de usuario
    access: (req, res) => {
      //return res.send(req.body)        
      db.User.findOne({
                where: {
                  email: req.body.email
                }
              }, {include: ['image']})
              .then(users => {
               // return res.send(users)
              let errors = validationResult(req);
          
              if (!errors.isEmpty()) {
                return res.render("users/login", {
                  styles: ["login"],
                  errors: errors.mapped(),
                },{include: ['image']});
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
               
    //Listado de usuarios
    list: (req, res) => {
       db.User.findAll({
        include: ['image']
      })
      .then(users => {
        res.render('users/list', {
          styles: ['product/product'],
          title: 'Usuarios',
          users: users
        })
      }).catch(error => res.send(error))
    },
    
    //Perfil de usuario
    profile: (req,res) => {
     console.clear();
     console.log('sql')
      //return res.send(req.body)  
      db.User.findByPk(req.session.user.id,{
        include:['image']
      })
          .then(user => {
           ///return res.send(user)
           return res.render('users/profile',{
          user: user
    })
  })
  .catch(error => res.send(error))
},

    //Editar un usuario
    edit: (req, res) => {
      db.User.findOne(
        { where: 
          { email: req.session.user.email} },
        {
        include: ['image']
      })
      .then(users => { 
        res.render('users/userUpdate',{
          styles:["userUpdate"],
          title: 'Usuario: '+ users.firstName,
          users: users
        })
  })
  .catch(error => res.send(error))
},

    //Actualizar un usuario
    userUpdate: (req, res) =>{
      //return res.send(req.body)
        db.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        adress: req.body.adress,
        email: req.body.email, 
      }, {
        where: { email: req.session.user.email}
      })
      .then(user => {
        db.User.findOne({where: { email: req.session.user.email}}).then(user => {
          req.session.user = user;
              res.redirect('profile') 
        })
        
})
.catch(error => res.send(error))
},

//Eliminar un usuario
userDelete: (req,res) => {
  res.clearCookie('userEmail');
        req.session.destroy();
    db.User.destroy(
      {
          where: {
              id: req.params.id
          }
      })
      return res.redirect('/');
},

//Deslogueo de un usuario
    logout: (req,res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
},

//Error al querer ver products sin ser admin
errorLogueado: (req, res) => res.render('users/errorLogueado',
        {
          styles: ['errorLogueado'],
          title: 'Error',
        }
),
}


module.exports = userController