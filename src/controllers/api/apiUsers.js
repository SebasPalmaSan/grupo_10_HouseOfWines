const db = require('../../database/models');

module.exports = {
    list: (req, res) => {
        db.User.findAll({
            include:['image']
          }).then((users) => {
            return res.status(200).json({
                 meta: {status: 200},
                count: users.length,
                data: users.map(user => {
                    return {
                    id: user.id, 
                    name: user.firstName + ' ' + user.lastName,
                    email: user.email,
                    avatar: 'http://localhost:3000/avatars/' + user.image.url,
                    url: 'http://localhost:3000/api/users/' + user.id
                }}) 
            })
        }).catch((err) => {res.send(err);});

}, 

    show: function (req, res){
        db.User.findByPk(req.params.id,{
            include:['image']
          }).then(user => {
            return res.status(200).json({
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
            });
        }).catch((err) => {res.send(err);});
    },
    last: function(req, res) {
        db.User.findOne({
            include: ['image'],
            order: [['id', 'DESC']],
        }).then(user => {
            return res.status(200).json({
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
            });
        }).catch((err) => {res.send(err);});
    }
}