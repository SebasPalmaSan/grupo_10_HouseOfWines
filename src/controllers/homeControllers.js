const db = require('../database/models')

module.exports = {
    index: (req, res) => {
    
        db.Product.findAll({include: [{association:'image'}]})
        .then(function(products){
          //  return res.send(products)
            res.render('home', {
            styles: ['home'],
            title: 'House of Wines | Home',
            products: products,
        })
    })
}
}