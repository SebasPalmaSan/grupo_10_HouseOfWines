//const file = require('../../disabled/data/models/file')

module.exports = {
    upload: (req, res) => res.render('files/upload',{
        styles: ['files/upload'],
        title: 'House of Wines | Subir imagenes',
    }),
    store: (req, res) => res.send(req.files.map(f => file.create(f)))
}