const express = require('express');
const router = express.Router();

const {
  create,
  destroy,
  list,
  update,
  changeCategory,
} = require('../controllers/task');

router.post('/', create);
router.get('/category/:idCategory', list);
router.put('/:id', update);
router.patch('/:id/category/:idCategory', changeCategory);
router.delete('/:id', destroy);

module.exports = router;
