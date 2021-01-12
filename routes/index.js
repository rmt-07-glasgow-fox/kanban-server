const router = require('express').Router();

router.get('/', (req, res) => res.status(200).json('hello kanban from server'));

module.exports = router;