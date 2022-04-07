const db = require('../../database/models');

module.exports = {
    list: function (req, res){
        db.Product.findAll({include: ['image','categories']})
        .then((products) => {
            return res.status(200).json({
                meta: {
                        status:200,
                        count:products.length,
                        productsByCategory:{
                            vinos: products.map(({category}) => category ==1).reduce((a,b)=> {return a+b},0),
                            espumantes: products.map(({category}) => category ==2).reduce((a,b)=> {return a+b},0),
                            destilados: products.map(({category}) => category ==3).reduce((a,b)=> {return a+b},0),
                            whiskys: products.map(({category}) => category ==4).reduce((a,b)=> {return a+b},0),
                            accesorios: products.map(({category}) => category ==5).reduce((a,b)=> {return a+b},0)
                }},
                data:products.map(product =>{
                    return {
                        id:product.id,
                        name:product.name,
                        description: product.description,
                        category: product.categories.name,
                        price: product.price,
                        image:'http://localhost:3000/products/' + product.image.url,
                        product: 'http://localhost:3000/api/products/' + product.id
                    }})
            });
            }).catch((err) => {res.send(err);});

},
    show: function (req, res){
        db.Product.findByPk(req.params.id, {
            include: ['image','categories'],
        }).then(product => {
                return res.status(200).json({
                    meta: {status: 200},
                    data:{
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.categories.name,
                    price: product.price,
                    discount: product.discount,
                    review: product.review, 
                    image:'http://localhost:3000/products/' + product.image.url,
                    product: 'http://localhost:3000/api/products/' + product.id
                }})
        }).catch((err) => {res.send(err);});
    },
    last: function(req, res) {
        db.Product.findOne({
            include: ['image', 'categories'],
            order: [['id', 'DESC']],
        }).then(product => {
            return res.status(200).json({
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                discount: product.discount,
                review: product.review,
                image:'http://localhost:3000/products/' + product.image.url,
                product: 'http://localhost:3000/api/products/' + product.id
            })
        }).catch((err) => {res.send(err);});
    }
     
}

