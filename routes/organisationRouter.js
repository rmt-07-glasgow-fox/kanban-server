const router = require('express').Router();
const organisationController = require('../controllers/organisationController');
const isAuthorizeOrganisation = require('../middlewares/isAuthorizeOrganisation');

router.get('/', organisationController.getAll);
router.post('/', organisationController.store);
router.get('/:id', organisationController.get);
router.get('/:id/users', organisationController.getUser);
router.post('/:id/users/:userId', isAuthorizeOrganisation, organisationController.storeUser);
router.put('/:id', isAuthorizeOrganisation, organisationController.update);
router.delete('/:id', isAuthorizeOrganisation, organisationController.destroy);
router.delete('/:id/users/:userId', isAuthorizeOrganisation, organisationController.destroyUser);

module.exports = router;