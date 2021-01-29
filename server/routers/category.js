const router = require('express').Router()
const Category = require('../controllers/category')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', Category.showAll)
router.post('/', Category.createCategory)



module.exports = router