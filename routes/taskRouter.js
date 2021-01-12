const router = require('express').Router();
const taskController = require('../controllers/taskController');
const isAuthorizeTask = require('../middlewares/isAuthorizeTask');

router.get('/', taskController.getAll);
router.post('/', taskController.store);
router.get('/:id', taskController.get);
router.put('/:id', isAuthorizeTask, taskController.update);
router.patch('/:id', isAuthorizeTask, taskController.updateCategory);
router.delete('/:id', isAuthorizeTask, taskController.destory);


module.exports = router;