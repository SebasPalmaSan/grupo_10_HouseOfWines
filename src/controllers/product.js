//const model = require('../models/product');
const db = require('../database/models')
//const file = require('../../disabled/data/models/file')

module.exports = {
    index: (req, res) =>  {
        db.Product.findAll({
            include: ['Producto', 'Description', 'Discount', 'OldPrice', 'NewPrice'],
    })
        .then((products =>{
       res.render('products/list', {
        styles: ['products/list', 'main'],
        title: 'House of Wines | Productos',
        products: products
       })
    })
    .catch(error => res.send(error))
    )
    },

    create: (req, res) => 
    Promise.all([db.Product.findAll(), db.Description.findAll(), db.Discount.findAll(), db.OldPrice.findAll(), db.NewPrice.findAll()])
    .then(([name, description, discount, oldPrice, newPrice]) =>{
    res.render('products/create', {
        styles: ['products/create', 'main'],
        title: 'House of Wines | Crear producto'
    })
    }),

    save: (req, res) => {
        req.body.file = req.files;
        let created = model.create(req.body);
        return res.redirect('/products/detail/' + created.id)
    },
    show: (req, res) => {
        db.Product.findByPk(req.params.id, 
            {
               include: ['product', 'description', 'discount', 'oldPrice', 'newPrice']
            })
               .then(product => {
        res.render('products/detail', {
        styles: ['products/detail', 'main'],
        title: 'House of Wines | ' + product.name,
        product: product,
        });
    })
    },

    edit: (req, res) =>  {
        const productID = req.params.id
        const product = db.Product.findByPk(productID, {
            include: ['discount', 'oldPrice', 'newPrice'],
        })
    
        promise.all([product, db.Discount.findAll(), db.OldPrice.findAll(), db.NewPrice.findAll()])
        .then(([product, discount, oldPrice, newPrice]) => {
        res.render('products/edit', {
        styles: ['products/edit', 'main'],
        title: 'House of Wines | Editar producto',
        product: product,
        discount: discount,
        oldPrice: oldPrice,
        newPrice: newPrice
    })
    })
},

    modify: (req, res) => {
        let updated = model.update(req.params.id, req.body);
        return res.redirect('/products/' + updated.id)
    },
    delete: (req, res) => {
        product.delete(req.body.id);
        return res.redirect('/products/')
    }
}
