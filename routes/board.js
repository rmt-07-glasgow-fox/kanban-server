const express = require('express');
const router = express.Router();

const { create, list, detail, destroy } = require('../controllers/board');
const requireToken = require('../helpers/requireToken');

router.post('/', requireToken, create);
router.get('/organization/:id', requireToken, list);
router.get('/:id', requireToken, detail);
router.delete('/:id', requireToken, destroy);

module.exports = router;
