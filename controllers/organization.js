const { Organization, Member, User } = require('../models');

exports.create = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const body = {
      name: name,
      UserId: userId,
    };

    const organization = await Organization.create(body);

    bodyMember = {
      role: 'admin',
      UserId: userId,
      OrganizationId: organization.id,
    };

    await Member.create(bodyMember);

    return res.status(201).json(organization);
  } catch (err) {
    return next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const isFound = await Organization.findOne({
      where: { id: id, UserId: userId },
    });
    if (!isFound) return next({ name: 'NotFound', attr: 'Organization' });
    else {
      await Organization.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Organization has been deleted' });
    }
  } catch (err) {
    return next(err);
  }
};

exports.listByUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const orgs = await Member.findAll({
      where: { UserId: userId },
      include: [Organization],
    });

    return res.status(200).json(orgs);
  } catch (err) {
    return next(err);
  }
};

exports.member = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const isMember = await Member.findOne({
      where: { UserId: userId, OrganizationId: id },
    });

    if (!isMember) return next({ name: 'NotFound', attr: 'Organization' });
    else {
      const orgs = await Organization.findOne({
        where: { id: id },
        include: [
          {
            model: User,
            attributes: { exclude: ['password'] },
          },
        ],
      });

      return res.status(200).json(orgs);
    }
  } catch (err) {
    return next(err);
  }
};

exports.invite = async (req, res, next) => {
  const id = req.params.id;
  const uId = req.user.id;
  const { email } = req.body;

  try {
    const isAdmin = await Member.findOne({
      where: { role: 'admin', UserId: uId, OrganizationId: id },
    });

    if (!isAdmin) return next({ name: 'NotFound', attr: 'Organization' });
    else {
      const isUser = await User.findOne({ where: { email: email } });
      if (!isUser) return next({ name: 'NotFound', attr: 'User' });

      const isMember = await Member.findOne({
        where: { UserId: isUser.id, OrganizationId: id },
      });

      if (isMember) return next({ name: 'Member' });
      else {
        const member = await Member.create({
          role: 'member',
          UserId: isUser.id,
          OrganizationId: id,
        });
        return res.status(200).json(member);
      }
    }
  } catch (err) {
    return next(err);
  }
};

exports.removeMember = async (req, res, next) => {
  const id = req.params.id;
  const uId = req.user.id;
  const UserId = req.params.user;

  try {
    const isAdmin = await Member.findOne({
      where: { role: 'admin', UserId: uId, OrganizationId: id },
    });

    if (!isAdmin) return next({ name: 'NotFound', attr: 'Organization' });
    else {
      const isUser = await User.findOne({ where: { id: UserId } });
      if (!isUser) return next({ name: 'NotFound', attr: 'User' });

      const isMember = await Member.findOne({
        where: { UserId: isUser.id, OrganizationId: id },
      });

      if (!isMember) return next({ name: 'NotFound', attr: 'Member' });
      else {
        const admin = await Member.findOne({
          where: { UserId: isUser.id, OrganizationId: id, role: 'admin' },
        });
        if (!admin) {
          await Member.destroy({ where: { UserId: UserId } });
          return res
            .status(200)
            .json({ message: 'Member has been remove from organization' });
        } else {
          return next({ name: 'NotAdmin', attr: 1 });
        }
      }
    }
  } catch (err) {
    return next(err);
  }
};

exports.changeRole = async (req, res, next) => {
  const id = req.params.id;
  const uId = req.user.id;
  const { email, role } = req.body;

  try {
    const isAdmin = await Member.findOne({
      where: { role: 'admin', UserId: uId, OrganizationId: id },
    });

    if (!isAdmin) return next({ name: 'NotFound', attr: 'Organization' });
    else {
      const isUser = await User.findOne({ where: { email: email } });
      if (!isUser) return next({ name: 'NotFound', attr: 'User' });

      const isMember = await Member.findOne({
        where: { UserId: isUser.id, OrganizationId: id },
      });
      if (!isMember) return next({ name: 'NotFound', attr: 'Member' });
      else {
        await Member.update({ role: role }, { where: { UserId: isUser.id } });
        return res.status(200).json({ message: 'Member has been updated' });
      }
    }
  } catch (err) {
    return next(err);
  }
};
