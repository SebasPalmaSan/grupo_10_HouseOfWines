const {Router} = require('express');
const router = Router();
const {login, register} = require('../controllers/user');

router.get('/login', login);
router.get('/register', register);
module.exports = router