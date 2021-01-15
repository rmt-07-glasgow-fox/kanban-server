function errorHandler (err, req, res, next) {
  console.log (err.errors)
  if (err.errors) {
    var arrErrors = err.errors.map (e => {
      return e.message
    })
  }
  console.log (err.name, 'errorhandler')
  console.log (err.message, 'errorhandler message')

  switch (err.name) {
    case 'SequelizeValidationError':
      res.status (400).json ({name: 'error', message: arrErrors})
      break;
    case 'Invalid email / password':
      res.status (400).json ({name: 'error', message: err.name})
      break;
    case 'JsonWebTokenError':
      res.status (403).json ({name: 'error', message: err.message})
      break;
    case 'Error not found':
      res.status(404).json ({message: 'Error not found'})
    default:
      res.status (500).json ({message: 'Internal server error'})
  }
}

module.exports = {
  errorHandler
}