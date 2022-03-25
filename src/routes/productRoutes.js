const {Router} = require('express');
const product = require('../controllers/productControllers');
const router = Router();
const productControllers = require('../controllers/productControllers')
const path = require('path');
const validatorSave = require('../middlewares/saveMiddleware');
//const file = require('../controllers/file');
const multer = require('multer');
//const upload = multer({storage: multer.diskStorage({
    //destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../uploads/products')),
    //filename: (req, file, cb) => cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
//})})

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

//Detalle de Producto
router.get('/detail/:id', productControllers.detail);

//Actualizar Producto
router.get('/edit/:id', productControllers.edit);
router.post('/edit/:id', productControllers.update);

//Eliminar Producto
router.post('/delete/:id', productControllers.delete);


//router.get('/list', index);

//router.get('/edit/:id', edit);
//router.get('/:id', show);
//router.post('/create',[upload.any()], save)
//router.put('/:id',modify)
//router.delete('/',product.delete);


module.exports = router