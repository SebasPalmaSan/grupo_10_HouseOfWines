const model = require('../models/user')

module.exports = {
    index: (req, res) =>  res.render('user/list', {
        styles: ['user/list', 'main'],
        title: 'House of Wines | Usuarios',
        products: model.all()
    
    }),
    create: (req, res) => res.render('user/create', {
        styles: ['users/create', 'main'],
        title: 'House of Wines | Crear usuario'
    }),
    save: (req, res) => {
        let created = model.create(req.body);
        return res.send(created)
    }
    
}