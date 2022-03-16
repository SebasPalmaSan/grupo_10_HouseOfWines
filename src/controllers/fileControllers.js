const file = require("../models/file")


module.exports = {
    upload: (req, res) => res.render('files/upload',{
        styles: ['files/upload'],
        title: 'House of Wines | Subir imagenes',
    }),
    store: (req, res) => res.send(req.files.map(f => file.create(f))),

    uploadAvatar: (req, res) => {

        if (req.files && req.files.length > 0) {
          db.Image.create({
            url: req.files[0].filename, Type: 2
          })
            .then(imagenAvatar => {
              db.User.update({ avatar: imagenAvatar.id }, {
                where: {
                  id: req.session.user.id
                }
              })
                .then(update => {
                  (req.session.user.id)
    
                })
                .then(user => {
                  req.session.user = user
                })
    
              res.redirect('/users/profile')
            })
            .catch((error) => res.send(error));
        }
      },
}