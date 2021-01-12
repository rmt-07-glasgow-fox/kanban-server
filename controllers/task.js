const { Category, Task, Board } = require('../models');
const isMember = require('../helpers/isMember');

exports.create = async (req, res, next) => {
  const userId = req.user.id;
  const { title, CategoryId } = req.body;

  try {
    const isCategory = await Category.findOne({ where: { id: CategoryId } });
    if (!isCategory) return next({ name: 'NotFound', attr: 'Category' });

    const isBoard = await Board.findOne({ where: { id: isCategory.BoardId } });
    if (!isBoard) return next({ name: 'NotFound', attr: 'Board' });

    const ismember = await isMember(userId, isBoard.OrganizationId);
    if (!ismember) return next({ name: 'NotMember' });

    const body = { title: title, UserId: userId, CategoryId: CategoryId };
    const task = await Task.create(body);

    return res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.destroy = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const isOwner = await Task.findOne({ where: { id: id, UserId: userId } });
    if (!isOwner) return next({ name: 'NotOwner' });

    const isCategory = await Category.findOne({
      where: { id: isOwner.CategoryId },
    });
    if (!isCategory) return next({ name: 'NotFound', attr: 'Category' });

    const isBoard = await Board.findOne({ where: { id: isCategory.BoardId } });
    if (!isBoard) return next({ name: 'NotFound', attr: 'Board' });

    const ismember = await isMember(userId, isBoard.OrganizationId);
    if (!ismember) return next({ name: 'NotMember' });

    await Task.destroy({ where: { id: id } });

    return res.status(200).json({ message: 'Task has been deleted' });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  const userId = req.user.id;
  const idCategory = req.params.idCategory;

  try {
    const isCategory = await Category.findOne({ where: { id: idCategory } });
    if (!isCategory) return next({ name: 'NotFound', attr: 'Category' });

    const isBoard = await Board.findOne({ where: { id: isCategory.BoardId } });
    if (!isBoard) return next({ name: 'NotFound', attr: 'Board' });

    const ismember = await isMember(userId, isBoard.OrganizationId);
    if (!ismember) return next({ name: 'NotMember' });

    const task = await Task.findAll({ where: { CategoryId: idCategory } });

    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  const { title } = req.body;

  try {
    const isOwner = await Task.findOne({ where: { id: id, UserId: userId } });
    if (!isOwner) return next({ name: 'NotOwner' });

    const isCategory = await Category.findOne({
      where: { id: isOwner.CategoryId },
    });
    if (!isCategory) return next({ name: 'NotFound', attr: 'Category' });

    const isBoard = await Board.findOne({ where: { id: isCategory.BoardId } });
    if (!isBoard) return next({ name: 'NotFound', attr: 'Board' });

    const ismember = await isMember(userId, isBoard.OrganizationId);
    if (!ismember) return next({ name: 'NotMember' });

    await Task.update({ title: title }, { where: { id: id } });

    return res.status(200).json({ message: 'Task has been updated' });
  } catch (err) {
    next(err);
  }
};

exports.changeCategory = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  const idCategory = req.params.idCategory;

  try {
    const isOwner = await Task.findOne({ where: { id: id, UserId: userId } });
    if (!isOwner) return next({ name: 'NotOwner' });

    const isCategory = await Category.findOne({
      where: { id: idCategory },
    });
    if (!isCategory) return next({ name: 'NotFound', attr: 'Category' });

    const isBoard = await Board.findOne({ where: { id: isCategory.BoardId } });
    if (!isBoard) return next({ name: 'NotFound', attr: 'Board' });

    const ismember = await isMember(userId, isBoard.OrganizationId);
    if (!ismember) return next({ name: 'NotMember' });

    await Task.update({ CategoryId: idCategory }, { where: { id: id } });

    return res.status(200).json({ message: 'Task has been updated' });
  } catch (err) {
    next(err);
  }
};
