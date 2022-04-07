const db = require('../database/models');
const sequelize = db.sequelize;

module.exports = {
    index: (req, res) => {
    
        db.Product.findAll({include: [{association:'image'}], order: sequelize.random()})
        .then(function(products){
            res.render('home', {
            styles: ['home'],
            title: 'House of Wines | Home',
            products: products,
        })
    })
}
}