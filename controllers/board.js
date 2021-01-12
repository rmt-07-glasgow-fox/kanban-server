const { Board, Category } = require('../models');
const isAdmin = require('../helpers/isAdmin');
const isMember = require('../helpers/isMember');

exports.create = async (req, res, next) => {
  const userId = req.user.id;
  const { name, OrganizationId } = req.body;

  if (!name || !OrganizationId) return next({ name: 'BoardValidation' });

  try {
    const isadmin = await isAdmin(userId, OrganizationId);
    if (!isadmin) return next({ name: 'NotAdmin', attr: 0 });
    else {
      const body = {
        name: name,
        OrganizationId: OrganizationId,
      };

      const board = await Board.create(body);
      const backlog = await Category.create({
        name: 'Backlog',
        BoardId: board.id,
      });
      await Category.create({ name: 'Todo', BoardId: board.id });
      await Category.create({ name: 'Doing', BoardId: board.id });
      await Category.create({ name: 'Done', BoardId: board.id });

      return res.status(201).json(board);
    }
  } catch (err) {
    return next(err);
  }
};

exports.list = async (req, res, next) => {
  const idOrganization = Number(req.params.id);
  const userId = req.user.id;

  try {
    const ismember = await isMember(userId, idOrganization);
    if (!ismember) return next({ name: 'NotMember' });
    else {
      const boards = await Board.findAll({
        where: { OrganizationId: idOrganization },
      });

      return res.status(200).json(boards);
    }
  } catch (err) {
    next(err);
  }
};

exports.detail = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const board = await Board.findOne({
      where: { id: id },
      include: [Category],
    });

    if (!board) return next({ name: 'NotFound', attr: 'Board' });

    const ismember = await isMember(userId, board.OrganizationId);

    if (!ismember) return next({ name: 'NotMember' });
    else {
      return res.status(200).json(board);
    }
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  const { name } = req.body;

  try {
    const board = await Board.findOne({
      where: { id: id },
      include: [Category],
    });

    if (!board) return next({ name: 'NotFound', attr: 'Board' });

    const isadmin = await isAdmin(userId, board.OrganizationId);

    if (!isadmin) return next({ name: 'NotAdmin', attr: 0 });
    else {
      await Board.update({ name: name }, { where: { id: id } });
      return res.status(200).json({ message: 'Board has been updated' });
    }
  } catch (err) {
    next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const board = await Board.findOne({
      where: { id: id },
      include: [Category],
    });

    if (!board) return next({ name: 'NotFound', attr: 'Board' });

    const isadmin = await isAdmin(userId, board.OrganizationId);

    if (!isadmin) return next({ name: 'NotAdmin', attr: 0 });
    else {
      await Board.destroy({ where: { id: id } });
      return res.status(200).json({ message: 'Board has been deleted' });
    }
  } catch (err) {
    next(err);
  }
};
