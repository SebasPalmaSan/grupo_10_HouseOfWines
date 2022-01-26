const model = require('../models/product');
const file = require('../models/file')

module.exports = {
    index: (req, res) => //res.send(model.all())
    res.render('home', {
        styles: ['main'],
        title: 'House of Wines | Home',
        products: model.all()//.map(p => Object({...p, image: file.search('id', p.image)}))
    })
}