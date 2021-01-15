const { Organization, Member, User } = require('../models/index');

class MemberController {
    static async postMember (req, res, next) {
        try {
            if (!req.body.userId) {
                return next({ code: 400, errors: [{ message: "There is no user to add!" }] });
            }

            let data = await User.findOne({ where: { id: req.body.userId } });

            if (!data) {
                return next({ code: 404, msg: `User with id ${req.body.userId} not found!` });
            }

            data = await Member.findOne({ where: { userId: req.body.userId, orgId: req.params.orgId } });

            if (data) {
                return next({ code: 400, errors: [{ message: "User already in this organization" }] });
            }

            data = {
                userId: req.body.userId,
                orgId: req.params.orgId
            };

            data = await Member.create(data);

            res.status(201).json({ msg: "User added" });
        } catch (err) {
            next({ code: 500 });
        }
    }

    static async deleteMember (req, res, next) {
        try {
            if (!req.params.userId) {
                return next({ code: 400, errors: [{ message: "There is no user to remove!" }] });
            }

            let data = await Organization.findOne({ where: { id: req.params.orgId } });

            if (req.params.userId == data.admin) {
                return next({ code: 400, errors: [{ message: "Can't remove an admin" }] });
            }

            data = await User.findOne({ where: { id: req.params.userId } });

            if (!data) {
                return next({ code: 404, msg: `User with id ${req.params.userId} not found!` });
            }

            data = await Member.findOne({ where: { userId: req.params.userId, orgId: req.params.orgId } });

            if (!data) {
                return next({ code: 404, msg: `User with id ${req.params.userId} wasn't a member!` });
            }

            await Member.destroy({ where: { userId: req.params.userId, orgId: req.params.orgId } });

            res.status(200).json({ msg: "User has been removed" });
        } catch (err) {
            return next({ code: 500 });
        }
    }

    static async getMember (req, res, next) {
        try {
            let data = await Organization.findOne({ where: { id: req.params.orgId }, include: User });
            
            res.status(200).json(data.Users);
        } catch (err) {
            next({ code: 500 });
        }
    }
}

module.exports = MemberController;