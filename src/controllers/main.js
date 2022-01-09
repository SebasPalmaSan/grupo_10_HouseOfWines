module.exports = {
    index: (req, res) => res.render('home', {
        styles: ['main'],
        title: 'House of Wines | Home'
    })
}