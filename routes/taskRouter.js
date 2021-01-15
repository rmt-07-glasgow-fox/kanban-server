const express = require('express');
const taskRouter = express.Router();
const TaskController = require('../controllers/taskController');
const { authentication, orgMemberAuthorization } = require('../middlewares/auth');

taskRouter.use('/', authentication);
taskRouter.use('/:orgId', orgMemberAuthorization);

taskRouter.get('/', TaskController.getAll);
taskRouter.post('/:orgId', TaskController.postTask);
taskRouter.put('/:orgId/:taskId', TaskController.putTask);
taskRouter.patch('/:orgId/:taskId', TaskController.patchTask);
taskRouter.delete('/:orgId/:taskId', TaskController.deleteTask);

module.exports = taskRouter;