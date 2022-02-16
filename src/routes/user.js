const {Router} = require('express');
const router = Router();
const {login, register, create, profile, logout, save, access, uploadPassword, uploadAvatar} = require('../controllers/user');

const validatorSave = require('../middlewares/save');

const path = require('path');

//Imagenes con Multer
const multer = require('multer');
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, '../uploads/avatars')
        cb (null, folder);
    },
    filename: (req, file, cb) => {
        const nombreArchivo = 'imagenUsuario' + Date.now() + path.extname (file.originalname);
        cb(null, nombreArchivo)
    }
})
const fileUpload = multer({ storage: multerDiskStorage});

//Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//get
router.get('/login', guestMiddleware, login);
router.get('/register', guestMiddleware, register);
router.get('/profile', authMiddleware, profile);
router.get('/logout', logout);

//post
router.post('/register', validatorSave, save);
router.post('/access', [], access);
router.post('/register', fileUpload.single('imagenUsuario'), validatorSave, save);

//put
//router.put('/upload/password', [], uploadPassword);
//router.put('/upload/avatar', [], uploadAvatar);

module.exports = router;