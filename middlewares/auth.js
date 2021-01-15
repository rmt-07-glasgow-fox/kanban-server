const { User, Member, Organization } = require('../models/index');
const { getPayload } = require('../helpers/jwt');

async function authentication (req, res, next) {
    try {
        if (!req.headers.access_token) {
            return next({ code: 401, msg: "You must be logged in to access!" });
        }

        let payload = getPayload(req.headers.access_token);
        let data = await User.findOne({ where: { email: payload.email } });

        if (data) {
            req.headers.payload = payload;
            return next();
        } else {
            return next({ code: 401, msg: "You must be logged in to access!" });
        }
    } catch (err) {
        return next({ code: 500 });
    }
}

async function orgMemberAuthorization (req, res, next) {
    try {
        let data = await Organization.findOne({ where: { id: req.params.orgId } });

        if (!data) {
            return next({ code: 404, msg: `Data with id ${req.params.orgId} not found!` });
        }

        data = await Member.findOne({ where: { userId: req.headers.payload.id, orgId: req.params.orgId } });
        
        if (data) {
            return next();
        } else {
            return next({ code: 401, msg: "Access denied!" });
        }
    } catch (err) {
        return next({ code: 500 });
    }
}

async function orgAdminAuthorization (req, res, next) {
    try {
        let data = await Organization.findOne({ where: { id: req.params.orgId } });
        
        if (data.admin == req.headers.payload.id) {
            return next();
        } else {
            return next({ code: 401, msg: "You're not an admin!" });
        }
    } catch (err) {
        return next({ code: 500 });
    }
}

module.exports = { authentication, orgMemberAuthorization, orgAdminAuthorization };