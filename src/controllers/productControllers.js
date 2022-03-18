const db = require('../database/models');
const file = require('../models/file')
const sequelize = db.sequelize;


const productControllers = {

    create: (req, res) => {
        db.Category.findAll()
        .then(function(categoria) {
            return res.render('products/create', 
            { 
                styles: ['products/create'],
                title:'House of Wines | Creá un Producto nuevo',
                categoria: categoria 
            });
        })
    },
    
    save: (req, res) => {
        return res.send(req.body)
        db.Image.create({
            url: req.files[0].filename,Type:1
        }).then(ImagenProducto => {
        db.Product.create({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            review: req.body.review, 
            price: req.body.oldPrice,
            discount: req.body.discount,
            image: ImagenProducto.id
        })
        .then(()=>{
            return res.redirect('/products/')
        })
        .catch(error => res.send(error))
        })
    },
    
    list: (req, res) => {
        db.Product.findAll()
        .then(function(products){
            res.render('products/list', 
            {
                styles: ['product/list'],
                title:'House of Wines | Productos',
                products: products
            })
        })
    },

    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [{association:'image'}, {association:'category'}],
        })
        .then(function(product){
            res.render('/products/detail', 
            {
                styles: ['products/detail', 'home'],
                title: 'House of Wines | ' + product.name,
                product: product,
            })
        })
    },

    edit: (req, res) => {
        let pedidoProducto = db.Product.findByPk(req.params.id);
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
    },

    update: (req, res) => {
        db.Product.update({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            review: req.body.review, 
            price: req.body.oldPrice,
            discount: req.body.discount,
            //image: imageProduct
        }, {
        where: {
            id: req.params.id
        }
    });
        res.redirect('/products/' + req.params.id)
    },

    delete: (req, res) => {
        db.Product.destroy(
            {
                where: {
                    id: req.params.id
                }
            })
            res.redirect('/products');
    }
}
    module.exports = productControllers