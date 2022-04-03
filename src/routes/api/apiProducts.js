const {Router} = require('express');
const router = Router();
const {list, show} = require('../../controllers/api/apiProducts')


// ruta por get para mostrar todos los productos
router.get('/', list);

// ruta por get para mostrar el producto buscado
router.get('/:id', show);

module.exports = router