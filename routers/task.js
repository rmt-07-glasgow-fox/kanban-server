const router = require('express').Router();

const TaskController = require('../controllers/taskController.js');
const { authorize } = require('../middlewares/auth.js');

router.post('/', TaskController.createTask);
router.get('/', TaskController.getTask);

router.get('/:id', authorize, TaskController.getOneTask);
router.put('/:id', authorize, TaskController.putTask);
router.patch('/:id', authorize, TaskController.patchTask);
router.delete('/:id', authorize, TaskController.deleteTask);

module.exports = router;
