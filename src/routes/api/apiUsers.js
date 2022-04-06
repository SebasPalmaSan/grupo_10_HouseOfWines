const {Router} = require('express');
const router = Router();
const {list, show, last} = require('../../controllers/api/apiUsers')

// ruta por get para mostrar todos los usuarios
router.get('/', list);

// ruta por get para mostrar el ultimo usuario agregado
router.get('/last', last);

// ruta por get para mostrar el usuario buscado
router.get('/:id', show);


module.exports = router;