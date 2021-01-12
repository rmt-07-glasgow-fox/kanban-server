const router = require('express').Router();

router.get('/register', (req, res) => {
    res.send({msg: 'test from register'});
});
router.get('/login', (req, res) => {
    res.send({msg: 'test from Login'});
});

module.exports = router