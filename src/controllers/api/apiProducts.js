const db = require('../../database/models');

module.exports = {
    list: function (req, res){
        db.Product.findAll( {include: ['image','categories']})
        .then((products) => {
            if(products.length){
                let response = {
                    meta: {
                        status:200,
                        total:products.length,
                    },
                    data:[]
                }
                    products.forEach(product =>{
                        response.data.push({
                            id:product.id,
                            name:product.name,
                            description: product.description,
                            precio: product.precio,
                            imagen:`http://localhost:3000/uploads/${product.images.url}`,
                            producto: 'http://localhost:3000' + `/api/products/${product.id}`
                        })
                    })
                //     meta: {status: 200},
                //     count: products.length,
                //     // categoryById: categories.foreach(category => {
                //     //         return {
                //     //         name: category.name,
                //     //         categoryById: category.length
                //     //         }
                //     //     }
                //     // ),
                //     products: products,
                // }
                return res.status(200).json(response);
        } else {
            return res.status(404).json({
                error: 'No se encontraron productos'
            })}
    }).catch((err) => {res.send(err);});

},
    show: function (req, res){
        db.Product.findByPk(req.params.id, {
            include: ['image','categories'],
        }).then(product => {
            if(product) {
                return res.status(200).json({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    discount: product.discount,
                    review: product.review, 
                    //associations: product.map(() => {return product.association}),
                    url: 'http://localhost:3000/api/products/' + product.id
                })
            }else {
                return res.status(404).json({
                    error: 'No se encontro el producto'
                })}
        }).catch((err) => {res.send(err);});
    },
     
}