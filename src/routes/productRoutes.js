const {Router} = require('express');
const product = require('../controllers/productControllers');
const router = Router();
const productControllers = require('../controllers/productControllers')
const path = require('path');
//const adminMiddleware = require('../middlewares/authAdminMiddleware');
const validatorSave = require('../middlewares/saveMiddleware');
const multer = require('multer');


const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.join(__dirname, '../../uploads/products')
        cb (null, folder);
    },
    filename: (req, file, cb) => {
        const nombreArchivo = 'file' + Date.now() + path.extname (file.originalname);
        cb(null, nombreArchivo)
    }
})
const fileUpload = multer({ storage: multerDiskStorage});

//Crear un Producto
router.get('/create', productControllers.create);
router.post('/create',[fileUpload.any('file'),validatorSave], productControllers.save);

//Listado de Productos
router.get('/list/:id', productControllers.list);

//Buscar un Producto
router.get('/search/', productControllers.search);

//Detalle de Producto
router.get('/detail/:id', productControllers.detail);

//Actualizar Producto
router.get('/edit/:id', productControllers.edit);
router.post('/edit/:id', productControllers.update);

//Eliminar Producto
router.post('/delete/:id', productControllers.delete);


module.exports = router