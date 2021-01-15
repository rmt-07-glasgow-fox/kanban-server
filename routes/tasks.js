const router = require('express').Router();
const TaskController = require('../controllers/taskController.js');
const { authorize } = require('../middlewares/auth.js');


router.get('/', TaskController.getAll);
router.post('/', TaskController.createTask);
router.get('/:id', authorize, TaskController.getTaskById);
router.put('/:id', authorize, TaskController.updateTask);
router.delete('/:id', authorize, TaskController.deleteTask);



module.exports = router;