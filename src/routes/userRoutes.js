const express = require('express');
const {Router} = require('express');
const router = Router();
const userControllers = require('../controllers/userControllers');
const auth = require('../middlewares/authMiddleware')
const validatorSave = require('../middlewares/saveMiddleware');
const admin = require('../middlewares/authAdminMiddleware');
const path = require('path');
const guest = require('../middlewares/guestMiddleware');

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

//Crear un Usuario
router.get('/register',[guest], userControllers.create);

//Guardar Usuario
router.post('/register', [fileUpload.single('imagenUsuario'),guest, validatorSave], userControllers.save);

//Iniciar Sesion
router.get('/login',[guest],userControllers.login);

//Acceso a Cuenta
router.post('/access',userControllers.access);

//Perfil de Usuario
router.get('/profile',[auth], userControllers.profile);

//Listado de Usuarios
router.get('/list', userControllers.list);

//Desloguear Usuario
router.get('/logout',[auth],userControllers.logout);

//Error al querer ver products sin ser admin
router.get('/errorLogueado', userControllers.errorLogueado);

//Editar un Usuario
router.get('/edit',[auth], userControllers.edit)
router.post('/userUpdate/',[auth], userControllers.userUpdate);

//Eliminar un Usuario
router.post('/delete/:id', userControllers.userDelete);


module.exports = router;