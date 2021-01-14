module.exports = {
    errHandler : (err,req,res,next)=>{
        console.log(err.name,'aaaaaaaaaaa\n\n\n');
        console.log(err);
        let StatusCode = 500
        let message = 'Internal Server Error'
        switch (err.name) {
            case "NotFound":
                StatusCode = 404
                message = err.message                
                break;

            case "Unaothorized":
                StatusCode = 401
                message = err.message                
                break;
                
            case "Forbidden":
                StatusCode = 403
                message = err.message                
                break;
            
            case "JsonWebTokenError":
                StatusCode = 401
                message = "Silahkan Login terlebih dahulu"          
                break;
        }
        res.status(StatusCode).json({message})
    }
}