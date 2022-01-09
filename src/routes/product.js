const {Router} = require('express');
const router = Router();
const {index, create, save, show, edit} = require('../controllers/product');

router.get('/', index);
router.get('/create', create);

router.get('/:id', show);

router.get('/edit/:id', edit);

router.post('/', save);


module.exports = router