const db = require('../../database/models');

module.exports = {
    list: (req, res) => {
        db.User.findAll({
         include: ['image']
       }).then((users) => {
        if(users.length){
            let response = {
                meta: {status: 200},
                count: users.length,
                users: users.map(user => {
                    return {
                    id: user.id, 
                    nombre: user.firstName + ' ' + user.lastName,
                    email: user.email,
<<<<<<< HEAD
                    //avatar: 'http://localhost:3000/avatars/' + user.image.url,
=======
                    avatar: 'http://localhost:3000/avatars/' + user.image.url,
>>>>>>> 22870b74b16fadb74ab1c3d5f2886a4e5f8616cb
                    url: 'http://localhost:3000/api/users/' + user.id
                }})}
            return res.status(200).json(response);
        } else {
            return res.status(404).json({
                error: 'No se encontraron usuarios'
            })}
    }).catch((err) => {res.send(err);});

},
    show: function (req, res){
        db.User.findByPk(req.params.id,{
            include:['image']
          }).then(user => {
              let response = {
                meta: {status: 200},
                data: {
                    id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  phone: user.phone,
                  adress: user.adress,
                  avatar: 'http://localhost:3000/avatars/' + user.image.url,
                  url: 'http://localhost:3000/api/users/' + user.id
                }
              }
              
              return res.status(200).json(response);
          }).catch((err) => {res.send(err);});
    },
    last: function(req, res) {
        db.User.findOne({
            include: ['image'],
            order: [['id', 'DESC']],
        }).then(user => {
            let response = {
              meta: {status: 200},
              data: {
                  id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                adress: user.adress,
                avatar: 'http://localhost:3000/avatars/' + user.image.url,
                url: 'http://localhost:3000/api/users/' + user.id
              }
            }
            
            return res.status(200).json(response);
        }).catch((err) => {res.send(err);});
    }
}