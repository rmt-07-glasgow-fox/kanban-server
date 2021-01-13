const router = require('express').Router();
const TaskController = require('../controllers/taskController');
const { authorize } = require('../middlewares/auth');

router.get('/', TaskController.getTasks);
router.post('/', TaskController.postTask);
router.get('/:id', TaskController.getTask);
router.put('/:id', authorize, TaskController.putTask);
router.patch('/:id', authorize, TaskController.patchTask);
router.delete('/:id', authorize, TaskController.deleteTask);

module.exports = router;
