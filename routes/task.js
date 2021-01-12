const express = require('express');
const router = express.Router();

const {
  create,
  destroy,
  list,
  update,
  changeCategory,
} = require('../controllers/task');
const requireToken = require('../helpers/requireToken');

router.post('/', requireToken, create);
router.get('/category/:idCategory', requireToken, list);
router.put('/:id', requireToken, update);
router.patch('/:id/category/:idCategory', requireToken, changeCategory);
router.delete('/:id', requireToken, destroy);

module.exports = router;
