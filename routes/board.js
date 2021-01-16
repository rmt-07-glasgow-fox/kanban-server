const express = require('express');
const router = express.Router();

const { create, list, detail, destroy } = require('../controllers/board');

router.post('/', create);
router.get('/organization/:id', list);
router.get('/:id', detail);
router.delete('/:id', destroy);

module.exports = router;
