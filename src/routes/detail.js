const {Router} = require('express');
const router = Router;
const {detail} = require('../controllers/detail');

router.get('/detail', (req, res) => {
    res.render('detail')
});

module.exports = router;