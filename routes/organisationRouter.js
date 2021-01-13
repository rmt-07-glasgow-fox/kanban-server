const router = require('express').Router();
const organisationController = require('../controllers/organisationController');
const isAuthorizeOrganisation = require('../middlewares/isAuthorizeOrganisation');

router.get('/', organisationController.getAll);
router.post('/', organisationController.store);
router.get('/:id', organisationController.get);
router.put('/:id', isAuthorizeOrganisation, organisationController.update);
router.delete('/:id', isAuthorizeOrganisation, organisationController.destroy);


module.exports = router;