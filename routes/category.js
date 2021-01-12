const express = require('express');
const router = express.Router();

const { create, list, destroy } = require('../controllers/category');
const requireToken = require('../helpers/requireToken');

router.post('/', requireToken, create);
router.get('/board/:idBoard', requireToken, list);
router.delete('/:id', requireToken, destroy);

module.exports = router;
