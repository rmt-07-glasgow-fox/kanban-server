const router = require('express').Router();
const taskController = require('../controllers/taskController');
const { authorization } = require('../middlewares/auth');

router.get('/', taskController.showAll);

router.post('/', taskController.add);

router.use('/:id', authorization);

router.get('/:id', taskController.showOne);

router.put('/:id', taskController.editTask);

router.patch('/:id', taskController.editCategory);

router.delete('/:id', taskController.delete)

module.exports = router;