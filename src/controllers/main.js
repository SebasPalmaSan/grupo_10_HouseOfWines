module.exports = {
    index: (req, res) => //res.send(model.all())
    res.render('home', {
        styles: ['main'],
        title: 'House of Wines | Home',
    })
}