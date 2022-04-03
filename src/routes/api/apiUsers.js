const {Router} = require('express');
const router = Router();
const {list, show} = require('../../controllers/api/apiUsers')

router.get('/', list);
router.get('/:id', show)


module.exports = router;