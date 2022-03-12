//const model = require('../../disabled/data/models/product');
//const file = require('../../disabled/data/models/file');
//const user = require('../../disabled/data/models/user');
//const db = require('../database/models')

module.exports = {
    index: (req, res) => //res.send(model.all())
    res.render('home', {
        styles: ['main'],
        title: 'House of Wines | Home',
    })
}