const express = require('express');
const router = express.Router();

const {
  create,
  listByUser,
  destroy,
  member,
  invite,
  removeMember,
  changeRole,
} = require('../controllers/organization');
const requireToken = require('../helpers/requireToken');

router.post('/', requireToken, create);
router.get('/', requireToken, listByUser);
router.delete('/:id', requireToken, destroy);
router.get('/:id/member', requireToken, member);
router.post('/:id/member', requireToken, invite);
router.delete('/:id/member/:user', requireToken, removeMember);
router.put('/:id/member/role', requireToken, changeRole);

module.exports = router;
