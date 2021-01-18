const {Organization, User} = require("../models")

class organizationController {
    static createOrganization(req, res, next) {
        const name = req.body.name
        Organization.create({name})
        .then(org => {
            const {id, name} = org
            res.status(201).json({id, name})
        })
        .catch(err => {
            next(err)
        })
    }

    static getOrganizations(req, res, next) {
        Organization.findAll()
        .then(org => {
            const {id, name} = org
            res.status(200).json({id, name})
        })
        .catch(err => {
            next(err)
        })
    }

    static addUsertoOrg(req, res, next) {
        const OrganizationId = req.params.id
        const id = req.user.id
        User.update({OrganizationId}, {where: {id}})
        .then(user => {
            res.status(200).json({message: "request successfull"})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = organizationController