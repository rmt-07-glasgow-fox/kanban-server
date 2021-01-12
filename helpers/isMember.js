const { Member } = require('../models');

const isMember = async (idUser, idOrganization) => {
  try {
    const member = await Member.findOne({
      where: { UserId: idUser, OrganizationId: idOrganization },
    });
    if (!member) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = isMember;
