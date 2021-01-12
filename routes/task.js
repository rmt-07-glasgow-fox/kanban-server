const TaskController = require('../controllers/taskController');
const { authorization } = require('../middlewares/authMiddle');
const router = require('express').Router();

router.get('/', TaskController.getTask);
router.post('/', TaskController.createTask)

router.patch('/:id', authorization,TaskController.editCategory)
router.delete('/:id', authorization,TaskController.deleteTask)

module.exports = router