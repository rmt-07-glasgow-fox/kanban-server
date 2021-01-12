const router = require('express').Router()
const { AppController } = require('../controllers')
const { authorization } = require('../middlewares/auth')

router.post('/', AppController.create);
router.get('/', AppController.getAll);

router.get('/:id', authorization, AppController.getAppId);
router.put('/:id', authorization, AppController.editApp)
router.patch('/:id', authorization, AppController.updateApp)
router.delete('/:id', authorization, AppController.deleteApp)

module.exports = router;