const model = require('../models/user')

module.exports = {
    index: (req, res) =>  res.render('users/list', {
        styles: ['users/list', 'main'],
        title: 'House of Wines | Usuarios',
        products: model.all()
    }),
    create: (req, res) => res.render('users/create', {
        styles: ['users/create', 'main'],
        title: 'House of Wines | Crear usuario'
    }),
    save: (req, res) => {
        let created = model.create(req.body);
        return res.redirect('/users/detail/' + created.id)
    },
    show: (req, res) => {
        let result = model.serch('id', req.params.id)
        return result ? res.render('users/detail', {
        styles: ['users/detail', 'main'],
        title: 'House of Wines | ' + result.name,
        product: result
        }) : res.render('error', { msg: 'Usuario no encontrado'})
    },
    edit: (req, res) =>  res.render('users/edit', {
        styles: ['users/create', 'main'],
        title: 'House of Wines | Editar usuario',
        product: model.serch('id', req.params.id)
    }),
    modify: (req, res) => {
        let updated = product.edit(req.params.id, req.body);
        return res.redirect('/users/detail/' + updated.id)
    },
    delete: (req, res) => {
        product.delete(req.body.id);
        return res.redirect('/users/')
    }
}