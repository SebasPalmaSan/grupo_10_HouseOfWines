const file = require("../models/file")


module.exports = {
    upload: (req, res) => res.render('files/upload',{
        styles: ['files/upload'],
        title: 'House of Wines | Subir imagenes',
    }),
}