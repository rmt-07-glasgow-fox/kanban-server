const { Organization, Member, User, Category, Task } = require('../models/index');

class OrganizationController {
    static async postOrg (req, res, next) {
        try {
            let data = {
                name: req.body.name,
                admin: req.headers.payload.id
            };

            data = await Organization.create(data);

            await Member.create({ userId: req.headers.payload.id, orgId: data.id });
            await Category.bulkCreate([
                { name: "Back Log", orgId: data.id },
                { name: "Todo", orgId: data.id },
                { name: "Doing", orgId: data.id },
                { name: "Done", orgId: data.id }
            ]);

            data = {
                id: data.id,
                name: data.name,
                admin: data.admin
            };

            res.status(201).json(data);
        } catch (err) {;
            if (err.errors) {
                return next({ code: 400, errors: err.errors, name: "Validation Error" });
            }

            next({ code: 500 });
        }
    }

    static async getOrg (req, res, next) {
        try {
            let data = await User.findOne({ where: { id: req.headers.payload.id }, include: Organization, attributes: { include: ['updatedAt', 'createdAt'] } });

            res.status(200).json(data.Organizations);
        } catch (err) {
            next({ code: 500 });
        }
    }

    static async getOrgById (req, res, next) {
        try {
            let data = await Organization.findOne({ where: { id: req.params.orgId }, attributes: { exclude: ['updatedAt', 'createdAt'] }, include: [{ model: Category, include: Task }, User] });

            res.status(200).json(data);
        } catch (err) {
            next({ code: 500 });
        }
    }

    static async putOrg (req, res, next) {
        try {
            await Organization.update({
                name: req.body.name
            }, {
                where: { id: req.params.orgId }
            });

            let data = await Organization.findOne({ where: { id: req.params.orgId }, attributes: { exclude: ['updatedAt', 'createdAt'] } });

            return res.status(200).json(data);
        } catch (err) {
            if (err.errors) {
                return next({ code: 400, errors: err.errors });
            }
            next({ code: 500 });
        }
    }

    static async deleteOrg (req, res, next) {
        try {
            await Organization.destroy({ where: { id: req.params.orgId } });

            return res.status(200).json({ msg: "Organizations delete success" });
        } catch (err) {
            next({ code: 500 });
        }
    }

    static async patchOrg (req, res, next) {
        try {
            if (!req.body.userId) {
                return next({ code: 400, errors: [{ message: "Invalid change!" }] });
            }

            let data = await Member.findOne({ where: { userId: req.body.userId, orgId: req.params.orgId } });

            if (!data) {
                return next({ code: 404, msg: "This user wasnt a member" });
            }

            data = await Organization.update({
                admin: req.body.userId
            }, {
                where: { id: req.params.orgId }
            });

            res.status(200).json({ msg: "Admin updated!" });
        } catch (err) {
            return next({ code: 500 });
        }
    }
}

module.exports = OrganizationController;