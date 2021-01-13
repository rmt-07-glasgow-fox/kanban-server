const router = require('express').Router();
const TaskController = require('../controllers/taskController.js');
// AUTHORIZE

router.post('/task', TaskController.createTask);
router.get('/task', TaskController.getTask);

router.get('/task/:id', TaskController.getOneTask);
router.put('/task/:id', TaskController.putTask);
router.patch('/task/:id', TaskController.patchTask);
router.delete('/task/:id', TaskController.deleteTask);

module.exports = router;
