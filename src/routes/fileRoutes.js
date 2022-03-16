const {Router} = require('express');
const router = Router();
const path = require('path');
const file = require('../controllers/fileControllers');
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../uploads')),
    filename: (req, file, cb) => cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
})})

router.get('/', file.upload);

router.post('/', [upload.any()], file.store);

router.post('/upload/avatar',[fileUpload.any()], file.uploadAvatar);



module.exports = router