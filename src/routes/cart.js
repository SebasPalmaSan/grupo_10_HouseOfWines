const {Router} = require('express');
const product = require('../controllers/product');
const router = Router();
const {index, create, save, show, edit, modify} = require('../controllers/cart');

router.get('/', index);

router.get('/create', create);

router.get('/:id', show);

router.get('/edit/:id', edit);

router.put('/:id', modify)

router.post('/', save);

router.delete('/', product.delete);


module.exports = router