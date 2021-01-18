const router = require("express").Router()
const Controller = require("../controllers/categoryController")
const {authentificate} = require("../middleware/authentificate")
const authorize = require("../middleware/authorize")

router.use(authentificate)

router.post('/', Controller.createCategory)
router.get('/', Controller.getCategories)
router.put('/:id', Controller.updateCategory)
router.get('/:id', Controller.getCategory)
router.patch('/:id', Controller.patchCategory)
router.delete('/:id', Controller.deleteCategory)

module.exports = router
