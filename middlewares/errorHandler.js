module.exports = function (err, req, res, next){
    let status = err.status || 500
    let msg = err.msg || 'Internal Server Error'
    console.log('masuk error handler');
    if (err.name === 'SequelizeValidationError'){
        let errors = []
        err.errors.forEach(el => {
            errors.push(el.message)
        });
        status = 400
        msg = errors
    }else if (err.name ==='SequelizeUniqueConstraintError'){
        let errors = []
        err.errors.forEach(el =>{
            if(el.message == 'email must be unique'){
                errors.push('Email already exists')
            }
        })
        status = 400
        msg = errors
    }else if(err.msg ==='Not Authorize'){
        msg = err.msg
        status = 401
    }else if(err.msg ==='Authentication Failed'){
        msg = err.msg
        status = 401
    }else if(err.msg ==='Content Not Found'){
        msg = 'Not Found'
        status = 404
    }else if(err.msg ==='Task Not Found'){
        msg = err.msg
        status = 404
    }
    res.status(status).json({
        msg
    })
}