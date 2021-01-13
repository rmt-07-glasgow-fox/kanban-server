const router = require('express').Router();
const TaskController = require('../controllers/TaskController')
const { authorize } = require('../middlewares/auth')

// console.log('hello world');
router.get('/', TaskController.getTasks);
router.post('/', TaskController.addTask);

router.get('/:id', authorize, TaskController.getTask)
router.patch('/description/:id', authorize, TaskController.editDescription);  
router.patch('/category/:id', authorize, TaskController.editCategory);
router.delete('/:id', authorize, TaskController.deleteTask);

module.exports = router;