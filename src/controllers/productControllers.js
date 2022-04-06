const db = require('../database/models');
const {Op} = require('sequelize');


const productControllers = {
    
    //Crear un producto
    create: (req, res) => {
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
    
    //Guardar un producto
    save: (req, res) => {
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
    
    //Listado de productos
    list: (req, res) => {
        db.Product.findAll({ where: { category: req.params.id},
            include: [{association:'image'}, {association:'categories'}],
        })
        .then(function(products){
            res.render('products/list', 
            {
                styles: ['product/list'],
                title:'House of Wines | Productos',
                products: products
            })
        })
        .catch(error => res.send(error))
    },

    //Detalle de producto
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


    //Editar un producto
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

    //Actualizar producto
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


    //Eliminar un producto
    delete: (req, res) => {
        db.Product.destroy(
            {
                where: {
                    id: req.params.id
                }
            })
            res.redirect('/');
    },

   //Busqueda de producto
    search: (req, res) => {
        db.Product.findAll({
            where: {
                [Op.or]:{
                    name: { [Op.like]: '%' + req.query.keywords + '%' },
                    category:{ [Op.like]: '%' + req.query.keywords + '%' },
                    description:{ [Op.like]: '%' + req.query.keywords + '%' },
                    review:{ [Op.like]: '%' + req.query.keywords + '%' }
                }
            }, include: [{association:'image'}, {association:'categories'}]
        })
        .then(function(products){
             res.render('products/list', 
             {
                 styles: ['product/list'],
                 title:'House of Wines | Productos encontrados',
                 products: products
             })
         })
         .catch(error => res.send(error))
    }
}
    module.exports = productControllers