const model = require('../models/product')

module.exports = {
    index: (req, res) =>  res.render('products/list', {
        styles: ['products/list', 'main'],
        title: 'House of Wines | Productos',
        products: model.all()
    }),
    create: (req, res) => res.render('products/create', {
        styles: ['products/create', 'main'],
        title: 'House of Wines | Crear producto'
    }),
    save: (req, res) => {
        let created = model.create(req.body);
        return res.send(created)
    },
    show: (req, res) => {
        let result = model.serch('id', req.params.id)
        return result ? res.render('products/detail', {
        styles: ['products/detail', 'main'],
        title: 'House of Wines | ' + result.name,
        product: result
        }) : res.render('error', { msg: 'Producto no encontrado'})
    },
    edit: (req, res) =>  res.render('products/edit', {
        styles: ['products/create', 'main'],
        title: 'House of Wines | Editar producto',
        product: model.serch('id', req.params.id)
    })
}