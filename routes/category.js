const express = require('express');
const router = express.Router();

const { create, list, destroy } = require('../controllers/category');

router.post('/', create);
router.get('/board/:idBoard', list);
router.delete('/:id', destroy);

module.exports = router;
