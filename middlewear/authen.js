const {verifyToken} = require('../helpers/jwt')
module.exports = async (req, res, next) => {
    try {
        let access_token = req.headers.access_token
        if(!access_token){
            throw {
                status: 401,
                message: 'Please Login'
            }
        } else {
            let decode = verifyToken(access_token)
            if(!decode){
                throw {
                    status: 401,
                    message: 'Please Relogin'
                }
            } else {
                req.user = decode
                next ()
            }
        }
    } catch (err) {
        next(err)
    }
}
