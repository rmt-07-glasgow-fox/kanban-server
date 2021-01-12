const {cekToken} = require("../helpers/jwt")
const {User, KanbanList} = require("../models")

async function authentication (req, res, next) {
  try {
    let decoded = cekToken(req.headers.access_token)
    let find = await User.findOne({where : {email: decoded.email}})
    if (find) {
      req.user = { 
        id: find.id
      }
      next()
    } else {
      next({name: `Not Found`})
    }
  } catch (err) {
    next(err)
  }
}

async function authorize (req, res, next) {
  try {
    let data = await KanbanList.findOne({where : {id: req.params.id}})
    if (!data) {
      next({name: `Not Found`})
    } else if (data.UserId !== req.user.id) {
      next({name: `Unauthorize`})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {authentication, authorize}