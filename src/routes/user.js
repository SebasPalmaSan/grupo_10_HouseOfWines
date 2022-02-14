const {Router} = require('express');
const router = Router();
const {login, register, create, profile, logout, save, access, uploadPassword, uploadAvatar} = require('../controllers/user');
const validatorSave = require('../middlewares/save')
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../uploads')),
    filename: (req, file, cb) => cb(null, 'user-image-' + Date.now() + path.extname(file.originalname))
})
const upload = multer({storage});


//get
router.get('/login', login);
router.get('/register', register);
router.get('/profile', [], profile);
router.get('/logout', [], logout);

//post
router.post('/save', /*validatorSave,*/ save);
router.post('/access', [], access);


//put
//router.put('/upload/password', [], uploadPassword);
//router.put('/upload/avatar', [], uploadAvatar);

module.exports = router