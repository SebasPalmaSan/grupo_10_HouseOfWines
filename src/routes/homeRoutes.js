const {Router} = require('express');
const router = Router();
const {index} = require('../controllers/homeControllers');

router.get('/', index);

module.exports = router