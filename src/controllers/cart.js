//const model = require('../../disabled/data/models/cart')

module.exports = {
    index: (req, res) =>  res.render('products/carrito', {
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
        return res.redirect('/products/detail/' + created.id)
    },
    show: (req, res) => {
        let result = model.search('id', req.params.id)
        return result ? res.render('products/carrito', {
        styles: ['products/carrito', 'main'],
        title: 'House of Wines | ' + result.name,
        product: result
        }) : res.render('error', { msg: 'Producto no encontrado'})
    },
    edit: (req, res) =>  res.render('products/edit', {
        styles: ['products/create', 'main'],
        title: 'House of Wines | Editar producto',
        product: model.search('id', req.params.id)
    }),
    modify: (req, res) => {
        let updated = product.edit(req.params.id, req.body);
        return res.redirect('/products/detail/' + updated.id)
    },
    delete: (req, res) => {
        product.delete(req.body.id);
        return res.redirect('/products/carrito')
    }
}