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

router.post('/', create);
router.get('/', listByUser);
router.delete('/:id', destroy);
router.get('/:id/member', member);
router.post('/:id/member', invite);
router.delete('/:id/member/:user', removeMember);
router.put('/:id/member/role', changeRole);

module.exports = router;
