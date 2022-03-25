const db = require('../database/models');
//const file = require('../models/file')
const sequelize = db.sequelize;


const productControllers = {

    create: (req, res) => {
        //return res.send(req.body)
        db.Product.findAll()
        .then(function(producto) {
            return res.render('products/create', 
            { 
                styles: ['products/create'],
                title:'House of Wines | Creá un Producto nuevo',
                producto: producto 
            });
        })
    },
    
    save: (req, res) => {
        //return res.send(req.body)
        db.Image.create({
            url: req.files[0].filename
        }).then(ImagenProducto => {
        db.Product.create({
            name: req.body.name,
            category: parseInt(req.body.category),
            description: req.body.description,
            review: req.body.review, 
            price: req.body.price,
            discount: req.body.discount,
            images: ImagenProducto.id,
        })
        .then((producto)=>{
            return res.redirect('/products/detail/' + producto.id)

        })
        .catch(error => res.send(error))
        })
    },
    
    list: (req, res) => {
        db.Product.findAll({ where: { category: req.params.id},
            include: [{association:'image'}, {association:'categories'}],
        })
        .then(function(products){
           // return res.render(products)
            res.render('products/list', 
            {
                styles: ['product/list'],
                title:'House of Wines | Productos',
                products: products
            })
        })
        .catch(error => res.send(error))
    },

    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{association:'image'}, {association:'categories'}],
        })
        .then(function(product){
            res.render('products/detail', 
            {
                styles: ['products/detail', 'home'],
                title: 'House of Wines',
                product: product,
            })
        })
    },

    /* edit: (req, res) => {
        let pedidoProducto = db.Product.findByPk(req.params.id, {
            include: [{association:'image'}, {association:'categories'}],
        });
        let pedidoCategoria = db.Category.findAll();
        Promise.all([pedidoProducto, pedidoCategoria])
        .then(function([product, category]){
            res.render('products/edit', 
            { 
                styles: ['products/edit', 'main'],
                title: 'House of Wines | Editar producto',
                product: product, 
                category: category
            })
        })
    }, */
    edit: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{association:'image'}, {association:'categories'}],
        })
        .then(function(product){
            res.render('products/edit', 
            {
                styles: ['products/edit', 'main'],
                title: 'House of Wines | Editar producto',
                product: product, 
            })
        })
    },
    update: (req, res) => {
        db.Product.update({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            review: req.body.review, 
            price: req.body.price,
            discount: req.body.discount,
        }, {
        where: {
            id: req.params.id
        }
    });
        res.redirect('/products/detail/' + req.params.id)
    },

    delete: (req, res) => {
        db.Product.destroy(
            {
                where: {
                    id: req.params.id
                }
            })
            res.redirect('/');
    }
}
    module.exports = productControllers