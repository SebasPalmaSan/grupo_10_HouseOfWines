const {Router} = require('express');
const product = require('../controllers/product');
const router = Router();
const {index, create, save, show, edit, modify} = require('../controllers/product');
const path = require('path');
const file = require('../controllers/file');
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../uploads')),
    filename: (req, file, cb) => cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
})})

router.get('/', index);

router.get('/create',create);

router.get('/:id',product.show);

router.get('/edit/:id', edit);

router.put('/:id',modify)

router.post('/',[upload.any()],product.save)

router.delete('/',product.delete);


module.exports = router