const router = require('express').Router();
const categoryRouter = require('../controllers/categoryController');

router.post('/', categoryRouter.addCategory);

module.exports = router;