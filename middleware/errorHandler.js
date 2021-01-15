function errorHandler (err, req, res, next) {
  console.log('error handler')
  let errName = err.name
  let errMsg
  switch (errName) {
    case '404':
      res.status(404).json({message: '404 Not Found'})
      break;
    case '401':
      res.status(401).json({message: '401 Unauthorize'})
      break;
    case 'SequelizeValidationError':
      errMsg = err.message.split(',\n')
      res.status(400).json(errMsg)
      break
    case 'SequelizeDatabaseError':
      res.status(500).json({message: '500 Internal Server Error'})
      break
    default:
      console.log('custom error')
      errMsg = err.message.split(',\n')
      res.status(401).json(errMsg)
  }
}

module.exports = errorHandler;