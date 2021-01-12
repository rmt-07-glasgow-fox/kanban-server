const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({msg: 'test from task'});
});

module.exports = router