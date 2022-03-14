const {Router} = require('express');
const router = Router();
const {login, register, create, profile, edit, logout, save, access, userUpdate, user_delete} = require('../controllers/user');

const validatorSave = require('../middlewares/save');
const user = require('../controllers/user');
const path = require('path');

//Imagenes con Multer
const multer = require('multer');
//const userController = require('../controllers/user');
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, '../../uploads/avatars')
        cb (null, folder);
    },
    filename: (req, file, cb) => {
        const nombreArchivo = 'imagenUsuario' + Date.now() + path.extname (file.originalname);
        cb(null, nombreArchivo)
    }
})
const fileUpload = multer({ storage: multerDiskStorage});

//Middlewares
//const guestMiddleware = require('../middlewares/guestMiddleware');
//const authMiddleware = require('../middlewares/authMiddleware');

//get
router.get('/login',login);
router.get('/register',register);
router.get('/profile',profile);
router.get('/logout',logout);
router.get('/userUpdate/:id?', user.edit);


//post
//router.post('/create', create);
//router.post('/register', save);
router.post('/access', [],access);
router.post('/register', [fileUpload.single('imagenUsuario'), validatorSave], save);
router.post('/edit', edit)

//put
router.post('/userUpdate/:id', userUpdate);
//router.put('/upload/password', [], uploadPassword);
//router.put('/upload/avatar', [], uploadAvatar);

router.delete('/delete/:id', user_delete);

module.exports = router;