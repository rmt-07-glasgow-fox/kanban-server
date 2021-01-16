const { Member } = require('../models');

const isAdmin = async (idUser, idOrganization) => {
  try {
    const admin = await Member.findOne({
      where: { UserId: idUser, OrganizationId: idOrganization, role: 'admin' },
    });
    if (!admin) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = isAdmin;
