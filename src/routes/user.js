const {Router} = require('express');
const router = Router();
const {index, create, save} = require('../controllers/user');

router.get('/', index);
router.get('/create', create);
router.post('/', save);




module.exports = router