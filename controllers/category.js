const { Board, Category, Task, User } = require('../models');
const isAdmin = require('../helpers/isAdmin');
const isMember = require('../helpers/isMember');

exports.create = async (req, res, next) => {
  const userId = req.user.id;
  const { name, BoardId } = req.body;

  try {
    const isBoard = await Board.findOne({ where: { id: BoardId } });
    if (!isBoard) return next({ name: 'NotFound', attr: 'Board' });

    const isadmin = await isAdmin(userId, isBoard.OrganizationId);
    if (!isadmin) return next({ name: 'NotAdmin', attr: 0 });

    const data = {
      name: name,
      BoardId: BoardId,
    };

    const category = await Category.create(data);
    return res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  const idBoard = req.params.idBoard;
  const userId = req.user.id;

  try {
    const isBoard = await Board.findOne({ where: { id: idBoard } });
    if (!isBoard) return next({ name: 'NotFound', attr: 'Board' });

    const ismember = await isMember(userId, isBoard.OrganizationId);
    if (!ismember) return next({ name: 'NotMember' });

    const categories = await Category.findAll({
      where: { BoardId: idBoard },
      include: [
        {
          model: Task,
          include: {
            model: User,
            attributes: { exclude: ['password'] },
          },
        },
      ],
      order: [['createdAt', 'ASC']],
    });
    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const userId = req.user.id;
  const categoryId = Number(req.params.id);

  try {
    const isCategory = await Category.findOne({ where: { id: categoryId } });
    if (!isCategory) return next({ name: 'NotFound', attr: 'Category' });

    const isBoard = await Board.findOne({ where: { id: isCategory.BoardId } });
    if (!isBoard) return next({ name: 'NotFound', attr: 'Board' });

    const isadmin = await isAdmin(userId, isBoard.OrganizationId);
    if (!isadmin) return next({ name: 'NotAdmin', attr: 0 });

    await Category.destroy({ where: { id: categoryId } });
    return res.status(201).json({ message: 'Category has been deleted' });
  } catch (err) {
    next(err);
  }
};
