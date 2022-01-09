const {Router} = require('express');
const router = Router();
const {index} = require('../controllers/main');

router.get('/', index);




module.exports = router